#! python3
import numpy as np
import math
import matplotlib.pyplot as plt
import os

from numpy._core.numerictypes import datetime64, timedelta64

# imports data from logfiles that look as follows:
# [2020-01-01T00:00:00] session started
# [2020-01-01T00:05:00] short_break started
# [2020-01-01T00:06:00] short_break ended
# [2020-01-01T00:55:00] long_break started
# [2020-01-01T01:25:00] long_break ended
# [2020-01-01T02:05:00] session ended


def get_break_stats(session_data):
    #returns:
    #the number of breaks
    #the average duration of breaks
    #The above for both long and short breaks
    short_break_counter = 0
    long_break_counter = 0
    total_short_breaks = np.timedelta64(0)
    total_long_breaks = np.timedelta64(0)
    for row in range(len(session_data)):
        if session_data[row][1] == "short_break" and session_data[row][2] == "started":
            short_break_counter += 1
            total_short_breaks += session_data[row+1][0]-session_data[row][0]
        if session_data[row][1] == "long_break" and session_data[row][2] == "started":
            long_break_counter += 1
            total_long_breaks += session_data[row+1][0]-session_data[row][0]

    if total_short_breaks != 0:
        avg_short_breaks = total_short_breaks/short_break_counter
    else:
        avg_short_breaks = None
    if total_long_breaks != 0:
        avg_long_breaks = total_long_breaks/long_break_counter
    else:
        avg_long_breaks = None

    total_break_counter = short_break_counter + long_break_counter
    total_break_time = total_long_breaks + total_short_breaks
    average_break_time = np.timedelta64(total_break_time,'s')/total_break_counter

    return (total_break_time,total_break_counter, average_break_time,
            total_short_breaks,short_break_counter,avg_short_breaks,
            total_long_breaks, long_break_counter, avg_long_breaks)

def get_composite_stats():
    session_log_filenames = os.listdir("../session logs")

    #create a np array that has one row for each log file
    #each row has columns:
    #        session duration
    #        session rating
    #        total_break_time,total_break_counter, average_break_time,
    #        total_short_breaks,short_break_counter,avg_short_breaks,
    #        total_long_breaks, long_break_counter, avg_long_breaks

    session_dtype = [("start time",'datetime64[s]'),
        ("rating",np.int8),
        ("total break time",'timedelta64[s]'),
        ("number of breaks",np.int16),
        ("average break time",'timedelta64[s]'),
        ("total short break time",'timedelta64[s]'),
        ("number of short breaks",np.int16),
        ("average short break time",'timedelta64[s]'),
        ("total long break time",'timedelta64[s]'),
        ("number of long breaks",np.int16),
        ("average long break time",'timedelta64[s]'),
        ("end time",'datetime64[s]')]

    _study_stats = np.array([(datetime64(), 0, timedelta64(), 0, timedelta64(),
        timedelta64(), 0, timedelta64(), timedelta64(), 0, timedelta64(), datetime64())],dtype=session_dtype)
    study_stats = np.repeat( _study_stats,len(session_log_filenames), axis=0 )
    bad_file_count = 0
    for fileindex in range(len(session_log_filenames)):

        bad_file = False
        #read file contents into a python list
        with open("../session logs/"+session_log_filenames[fileindex]) as log_file:
            log_contents = log_file.read()
            if "session_rating" not in log_contents:
                bad_file = True
            log_contents = log_contents.rstrip("\n").split("\n")




        if bad_file:
            bad_file_count += 1
            continue
        _session_data = np.array([[np.datetime64(),"",""]])
        session_data = np.repeat(_session_data,len(log_contents),axis=0)


        #set up np array
        for row in range (len(log_contents)):
            __temp = log_contents[row].replace("[","").replace("]","").split()
            try:
                session_data[row][0] = np.datetime64(__temp[0])
                session_data[row][1] = __temp[1]
                session_data[row][2] = __temp[2]
            except:
                print(__temp)



        __temp = [np.datetime64(),0.0,
        np.timedelta64(),0,np.timedelta64(),
        np.timedelta64(),0,np.timedelta64(),
        np.timedelta64(),0,np.timedelta64(),
        np.datetime64()]
        __temp[0] = session_data[0][0]
        __temp[1] = int(session_data[-1][2])

        #(exclude last row as this contains session rating not break info)
        break_statistics = get_break_stats(session_data[:-2])
        __temp[2:11] = break_statistics
        __temp[11] = session_data[-2][0]
        study_stats[fileindex-bad_file_count] = tuple(__temp)
    
    study_stats.sort(order="start time")
    return study_stats[:-bad_file_count]




def render_stats(composite_stats):
    figure, ax= plt.subplots()
    #rating over time graph
    fig,ax = plt.subplots()
    data = np.array([[composite_stats[i][0],composite_stats[i][1]] for i in range(len(composite_stats))])
    ax.plot(data[:,0], data[:,1])
    ax.set(ylim=(0,5.1))
    fig.set_size_inches(12,6)
    fig.set_dpi(300)
    plt.savefig("../static/rating_time.png")

    #stacked study time over time graph
    fig,ax = plt.subplots()
    y1 = np.array([((composite_stats[i][11]-composite_stats[i][0])-composite_stats[i][5]-composite_stats[i][8])/np.timedelta64(60,'s')
                        for i in range(len(composite_stats))])
    y2 = np.array([composite_stats[i][5]/np.timedelta64(60,'s') for i in range(len(composite_stats))])
    y3 = np.array([composite_stats[i][8]/np.timedelta64(60,'s') for i in range(len(composite_stats))])

    y = np.vstack([y1,y2,y3])
    x = np.array([composite_stats[i][0] for i in range(len(composite_stats))])

    ax.stackplot(x,y, baseline="zero", labels=["total study time", "total short breaks", "total long breaks"])
    fig.set_size_inches(12,6)
    fig.set_dpi(300)
    ax.legend(loc='upper left', reverse=True)
    plt.savefig("../static/time_time.png")

    #break count vs rating
    fig,ax = plt.subplots()
    y = np.array([composite_stats[i][1] for i in range(len(composite_stats))])
    x = np.array([composite_stats[i][3] for i in range(len(composite_stats))])
    s = np.array([composite_stats[i][2]/np.timedelta64(5,'s') for i in range(len(composite_stats))])
    c = np.array([composite_stats[i][4]/np.timedelta64(1,'s') for i in range(len(composite_stats))])
    ax.scatter(x=x,y=y,c=c)
    ax.set_xlim(0,max(x)+.4)
    ax.set_xlabel("Number of rest breaks taken")
    ax.set_ylim(0,5.5)
    ax.set_ylabel("Session rating")
    ax.legend(loc='best',labels=["color: average break length"])
    fig.set_size_inches(6,6)
    fig.set_dpi(300)
    plt.savefig("../static/break_count_rating.png")
    return None

if __name__ == "__main__":

    data = get_composite_stats()
    render_stats(data)

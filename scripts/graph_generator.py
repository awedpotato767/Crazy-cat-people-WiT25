#! python3
import numpy as np
import math
import matplotlib.pyplot as plt
import os

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
        ("average long break time",'timedelta64[s]')]

    _study_stats = np.array([(np.datetime64('now'),0.0,
    np.timedelta64(),0,np.timedelta64(),
    np.timedelta64(),0,np.timedelta64(),
    np.timedelta64(),0,np.timedelta64())],dtype=session_dtype)
    study_stats = np.repeat(_study_stats,len(session_log_filenames),axis=0)
    for fileindex in range(len(session_log_filenames)):


        #read file contents into a python list
        with open("../session logs/"+session_log_filenames[fileindex]) as log_file:
            log_contents = log_file.readlines()

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
        np.timedelta64(),0,np.timedelta64()]
        __temp[0] = session_data[0][0]
        __temp[1] = int(session_data[-1][2])

        #(exclude last row as this contains session rating not break info)
        break_statistics = get_break_stats(session_data[:-2])
        __temp[2:11] = break_statistics
        study_stats[fileindex] = tuple(__temp)
    return study_stats




def render_stats(composite_stats):
    #rating over time graph
    rating_time, rating_time_ax = plt.subplots()
    rating_time_ax.plot( composite_stats[:][0], composite_stats[:][1])
    rating_time_ax.set(ylim=(0,5))
    plt.show()
    return None

if __name__ == "__main__":

    data = get_composite_stats()
    print(data)
    render_stats(data)

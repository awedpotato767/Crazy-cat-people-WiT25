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

def get_stats():
    session_log_filenames = os.listdir("../session logs")


    for log_filename in session_log_filenames:

        with open("../session logs/"+log_filename) as log_file:
            log_contents = log_file.readlines()

        _session_data = np.array([[np.datetime64(),"",""]])
        session_data = np.repeat(_session_data,len(log_contents),axis=0)

        for row in range (len(log_contents)):
            __temp = log_contents[row].replace("[","").replace("]","").split()
            session_data[row][0] = np.datetime64(__temp[0])
            session_data[row][1] = __temp[1]
            session_data[row][2] = __temp[2]
            print(session_data[row])


def render_stats(stats):

    return None

if __name__ == "__main__":
    get_stats()

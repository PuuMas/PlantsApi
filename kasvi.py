import serial,time

if __name__ == '__main__':

    #print('Running. Press CTRL-C to exit.')
    with serial.Serial("/dev/ttyACM0", 9600, timeout=1) as arduino:
        #Wait for the IoT-device to power on and read values
        time.sleep(3.0)
        if arduino.isOpen():
            #print("{} connected!".format(arduino.port))
            try:
                    if arduino.inWaiting() > 0:
                        answer = arduino.readline()
                        ser = answer.decode('ascii').split('x')
                        ser[2] = ser[2].rstrip()
                        print("Your sun level is " + ser[0])
                        print("Your Water level is " + ser[1])
                        print("Your tempature " + ser[2])
                        print("Your humidity " + ser[3])
                        arduino.flushInput()
                        arduino.close()
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.") 
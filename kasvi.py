import serial,time
import json

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
                        data = [{
                            "sun": ser[0],
                            "water": ser[1],
                            "tempature": ser[2],
                            "humidity": ser[3]
                            }]
                        dataJson = json.dumps(data)
                        print(dataJson)
                        arduino.flushInput()
                        arduino.close()
            except KeyboardInterrupt:
                print("KeyboardInterrupt has been caught.") 
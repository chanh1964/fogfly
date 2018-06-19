# FogFly
Fog Computing In Intelligent Transportation System
For more information, please visit [our website](https://fogfly.000webhostapp.com/)

## Components
1. Master Node
    - How to run:
        1. Fix script `masterNodeStartScript` according to system network setup
        1. Run master node by running the script
1. Slave Node
    - How to run:
        1. Fix script `slaveNodeStartScript` according to system network setup
        1. Run slave node by running the script
    - Fix error if applicable:
        1. If encounters error `cannot ... db of null`
            - Create *empty* directory `data[99..103]` 
        1. Port collision:
            
                $ lsof -i:[port] //to find pid of process that is using the port
                $ kill -9 [pid]
            
            and run the script again
1. Configuration
    *Please see the Readme.md inside `configuration` for instructions*

### Dragonfly Team 2018
#### Need Help? Please contact the developer team through email: *fogfly@dragonfly.com*
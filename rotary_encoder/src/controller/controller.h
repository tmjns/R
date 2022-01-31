#include "helpers/common.h"
#include "../modules/RotaryEncoder/Rotary.h"

class Controller{
    public:
    
        Controller();
        void init();
        void update();

    private:
        
        Rotary rotary;
        Rotary rotary_pin_one;
        Rotary rotary_pin_two;
};

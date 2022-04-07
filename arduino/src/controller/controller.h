#include "helpers/common.h"
#include "../modules/RotaryEncoder/rotary.h"

class Controller{
    public:
    
        Controller();
        void init();
        void update();

    private:
        
        Rotary rotary;
};

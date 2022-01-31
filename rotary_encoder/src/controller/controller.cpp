#include "controller.h"

Controller::Controller(){}

void Controller::init() {
    delay(2000);
    Serial.println("Controller INIT");
    
    rotary_pin_one.init(2,"left");
    rotary_pin_two.init(3,"right"); 
    
}

void Controller::update() {
    rotary.update();
}

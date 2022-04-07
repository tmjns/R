#include "controller.h"

Controller::Controller(){}

void Controller::init() {
    Serial.println("Controller INIT");
    rotary.init();
}

void Controller::update() {
    rotary.update();
}

#include "controller/controller.h"

Controller controller;

void setup() {
  Serial.begin(9600);
  controller.init();
}

void loop() {
  controller.update();
}
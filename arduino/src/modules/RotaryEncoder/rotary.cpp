#include "rotary.h"

Rotary::Rotary(){}

void Rotary::init() {
    Serial.println("Rotary INIT");
    pinMode(2,INPUT_PULLUP);
    pinMode(3,INPUT_PULLUP);
    attachInterrupt(2, dirUp, RISING); 
    attachInterrupt(3, dirDown, RISING);
}


void Rotary::update(){
    // update
}


void Rotary::dirUp() {
  if(digitalRead(3)==LOW) {
    Serial.print("--> RIGHT");
  }
}
   

void Rotary::dirDown() {
  if(digitalRead(2)==LOW) {
    Serial.print("--> LEFT");
  }
}
#include "Rotary.h"

volatile long x, counter = 0; 

Rotary::Rotary(){}


void Rotary::init(int pin, String dir) {
    Serial.println("Rotary INIT");
    this->rotary_pin = pin;
    this->rotary_dir = dir;
    pinMode(this->rotary_pin,INPUT_PULLUP);
    
    attachInterrupt(0, dirUp, RISING); 
    attachInterrupt(1, dirDown, RISING);
}


void Rotary::update(){
    if(counter != x){
        x = counter;
    }
}


void Rotary::dirUp() {
  if(digitalRead(3)==LOW) {
    counter++;
    Serial.print("1");
  }else{
    counter--;
  }
}
   

void Rotary::dirDown() {
  if(digitalRead(2)==LOW) {
    counter--;
    Serial.print("0");
  }else{
    counter++;
  }
}
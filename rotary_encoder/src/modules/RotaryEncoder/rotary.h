#include "helpers/common.h"

class Rotary{
    public:

        Rotary();
        void init(int pin, String dir);
        void update();

        static void dirUp();
        static void dirDown();

    private:

        int rotary_pin = 0;
        String rotary_dir = "";
        
};

#include <stdio.h>
#include <string.h>
#define DENSITY 62.4

int main(int argc, const char * argv[]) {
    float weight,volume;
    int size,letters;
    char name[40];
    printf("你好，你叫什么名字？\n");
    scanf("%s",name);
    printf("%s,你有多少斤?\n",name);
    scanf("%f",&weight);
    size=sizeof name;
    letters=strlen(name);
    volume=weight/DENSITY;
    printf("%f",volume);
    printf("你的名字有%d个字母",letters);
    printf("%d",size);
    return 0;
}

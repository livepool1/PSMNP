function updateAnd(text, obj, value, init, time) {
  var self = this
  time ++;
    if(text in obj) {
      if( !(text in qt) ) {             
        obj[text] = value;
        console.log("普通赋值")
        return

      } else {
        if( time != 1) {
          obj[text] = value;
          form[text] = value;
          qt[text] = true
          console.log("递归赋值")
          return
        } else {
          console.log("平级")
        }
      }
        // obj[text] = value;

        // if(init == null) {
        //   form[text] = value;
        //   console.log("非初始化")
        // }


    }
    for( var x in obj) {
        if(typeof obj[x] == "object") {
            updateAnd(text, obj[x], value, init,time)
        }
        qt[text] = true;
        // console.log("递归")

    }

    console.log(obj, "hahaha");
  }

var a = {
    name: 'lily',
    age: 24,
    position:{
        loc: 2,
        posiname: '哈哈哈'
    },
    distribution:{
        stated:1
    }
}

var qt=[]
var form=[]

updateAnd("loc", a, 3, null, 0)
console.log(a)
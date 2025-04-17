// logic to display current year

document.querySelector(".year").innerHTML = new Date().getFullYear()

// logic to handle to drop down menu
const menu_btn = document.querySelector(".menu-btn")
menu_btn.addEventListener("click", function(){
             document.querySelector("ul").classList.toggle("show-menu")
             document.querySelector("button img").classList.toggle("turn-up")
})


// logic to activate analog clock

// targetting all the elements needed
const secondHand = document.querySelector(".sec-hand")
const minuteHand = document.querySelector(".min-hand")
const hr_hand = document.querySelector(".hr-hand")
const dismiss_btn = document.querySelector(".dismiss-btn")
const success_container = document.querySelector(".alarm-success")

// target the containers
const digital_container = document.querySelector(".digital")
const analog_container =  document.querySelector(".analog")
const alarm_container =  document.querySelector(".alarm")  // the alarm form
const stop_watch_container = document.querySelector(".stop-watch")

// logic to display selected clock
const digital_handle = document.querySelector(".select-digital")
const analog_handle = document.querySelector(".select-analog")
const alarm_handle = document.querySelector(".select-alarm")
const stop_watch_handle = document.querySelector(".select-stop-watch")

 const sound = document.querySelector(".sound")

//   setting my variable global
   let alarm_interval  = ""


function displayAnalog(){
    
    let currentDate = new Date()

    let seconds = currentDate.getSeconds()
    let secondDeg = ((seconds/60) * 360) + 90
    secondHand.style.transform = `rotate(${secondDeg}deg)`

    let minutes = currentDate.getMinutes()
    let minutesDeg = ((minutes/60) * 360) + ((seconds/60) * 6) + 90
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`

    let hours = currentDate.getHours()
    let hoursDeg = ((hours / 12) * 360) + ((minutes/ 60) * 30) + 90
    hr_hand.style.transform = `rotate(${hoursDeg}deg)`
    
}

// digital display logic
function displayDigital(){
         let currentDate = new Date()
         let hrs = currentDate.getHours()
         let mins = currentDate.getMinutes()
         let secs = currentDate.getSeconds()
         
         let period = ""
         if(hrs < 12){
               period = "A.M"
             
         }else{
                period = "P.M"
         }

        //  set the period
          document.querySelector(".period").innerHTML = period

        //  convert to 12 hour time
         if(hrs > 12){
              hrs = hrs % 12
         }
         
         if(hrs < 10){
                document.querySelector(".hrs").innerHTML = "0" + hrs
         }else{
                document.querySelector(".hrs").innerHTML = hrs
         }
         
        if(mins < 10){
                  document.querySelector(".mins").innerHTML = "0" + mins
        }else{
             document.querySelector(".mins").innerHTML =  mins
        }
        
        if(secs < 10){
                 document.querySelector(".secs").innerHTML = "0" + secs
        }else{
                 document.querySelector(".secs").innerHTML = secs
        }

}


// to display the app you want 

digital_handle.addEventListener("click", function(){
         digital_container.style.display = "flex"
         analog_container.style.display = "none"
         alarm_container.style.display = "none"
         stop_watch_container.style.display = "none"

       //   fold up the ul
          document.querySelector("ul").classList.toggle("show-menu")
         document.querySelector("button img").classList.toggle("turn-up")
})

analog_handle.addEventListener("click", function(){
          digital_container.style.display = "none"
          alarm_container.style.display = "none"
           stop_watch_container.style.display = "none"
         analog_container.style.display = "flex"

         
       //   fold up the ul
          document.querySelector("ul").classList.toggle("show-menu")
         document.querySelector("button img").classList.toggle("turn-up")
})



// logic for  display alarm
alarm_handle.addEventListener("click", function(){
          digital_container.style.display = "none"
         analog_container.style.display = "none"
          stop_watch_container.style.display = "none"
         alarm_container.style.display = "flex"

         
       //   fold up the ul
          document.querySelector("ul").classList.toggle("show-menu")
         document.querySelector("button img").classList.toggle("turn-up")
})

// logic to display stop watch
stop_watch_handle.addEventListener("click", function(){
            stop_watch_container.style.display = "flex"
             digital_container.style.display = "none"
         analog_container.style.display = "none"
         alarm_container.style.display = "none"


         
       //   fold up the ul
          document.querySelector("ul").classList.toggle("show-menu")
         document.querySelector("button img").classList.toggle("turn-up")
})


// logic to set alarm
alarm_container.addEventListener("submit", function(event){
        event.preventDefault()
        
        let user_hr =  Number(document.querySelector(".user-hr").value)
        let user_min = Number( document.querySelector(".user-min").value)
        let user_sound = document.querySelector(".user-sound").value

       //  set the alarm time display
       document.querySelector(".alarm-hr").innerHTML = user_hr
       document.querySelector(".alarm-min").innerHTML = user_min
       document.querySelector(".alarm-display").style.display = "flex"

      
         
        alarm_interval =  setInterval(function(){
         
          let current_time = new Date()
     
        // get the current hr
        let current_hr = current_time.getHours()

        // get the current min
        let current_min = current_time.getMinutes()

        if(current_hr === user_hr && current_min === user_min){
                     
                      sound.src = user_sound
                      sound.play()
                     dismiss_btn.style.left = "0"
        }
         }, 1000)


       //   show alarm set success
       
       alarm_container.style.display = "none"
       success_container.style.display = "flex"
       
})


// logic to close alarm success
document.querySelector(".success-close").addEventListener("click", function(){
            success_container.style.display = "none"
            analog_container.style.display = "flex"
}) 

// logic to stop alarm
dismiss_btn.addEventListener("click", function(){
        sound.src = ""
        clearInterval(alarm_interval)
        dismiss_btn.style.left = "-150px"
})

// logic to start watch

// target all the stop watch  buttons
const start_btn = document.querySelector(".start-btn")
const stop_btn = document.querySelector(".stop-btn")
const clear_btn = document.querySelector(".clear-btn")

let stop_watch_interval = ""

// add click event listener to the start watch
start_btn.addEventListener("click", start_watch)


   //  define and initialize your variables for stop watch
      let hr = 0
      let min = 0
      let sec = 0

      // target the spans that will display the hrs, mins, secs

    const hr_display = document.querySelector(".s-hr")
    const min_display = document.querySelector(".s-min")
    const sec_display = document.querySelector(".s-sec")

function start_watch(){

       start_btn.disabled = true  // disable the start button

       start_btn.classList.add("active-btn")
       stop_btn.classList.remove("active-btn")
        clear_btn.classList.remove("active-btn")
  

      // to start increasing the secs
     stop_watch_interval =  setInterval(function(){
                   sec++  // increasing the no of secs
                   if(sec > 59){
                         sec = 0  // reset the sec back to 0
                         min ++   // increase the min by 1 (60secs = 1min)
                   }

                   if(min > 59){
                         min = 0  // reset the min back to 0
                         hr++  // increase the hr by 1 (60mins = 1hr)
                   }

                  //  display sec
                   if(sec < 10){
                        sec_display.innerHTML = "0" + sec + "sec(s)" // to ensure no single value
                   }else{
                          sec_display.innerHTML =  sec + "sec(s)"
                   }

                  //  display min
                    if(min < 10){
                        min_display.innerHTML = "0" + min + "min(s)"
                   }else{
                          min_display.innerHTML =  min +  "min(s)"
                   }

                   
                  //  display hr
                    if(hr < 10){
                        hr_display.innerHTML = "0" + hr +  "hr(s)"
                   }else{
                          hr_display.innerHTML =  hr +"hr(s)"
                   }




      }, 1000)
}

// logic to stop stop-watch
stop_btn.addEventListener("click", function(){
             stop_btn.classList.add("active-btn")
             start_btn.classList.remove("active-btn")
             clear_btn.classList.remove("active-btn")
  
            start_btn.disabled = false
            clearInterval(stop_watch_interval)
})

// logic to clear stop watch
clear_btn.addEventListener("click", function(){
        start_btn.classList.remove("active-btn")    
        stop_btn.classList.remove("active-btn")    
        clear_btn.classList.add("active-btn")  
        
        hr = 0
        min = 0
        sec = 0

        sec_display.innerHTML = "00"
        min_display.innerHTML = "00"
        hr_display.innerHTML = "00"

        clearInterval(stop_watch_interval)
})

// to run the clock
setInterval(displayAnalog, 1000)
setInterval(displayDigital, 1000)
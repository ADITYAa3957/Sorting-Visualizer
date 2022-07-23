const slider = document.querySelector(".size-slider");
const slider_value = document.querySelector(".slider-value");
const arrayGenerator = document.querySelector("#array-generator");
const array = document.querySelector(".array");
const selectSort = document.querySelector("#selection-sort");
const bubSort = document.querySelector("#bubble-sort");
const inserSort = document.querySelector("#insertion-sort");
const mergeSort = document.querySelector("#merge-sort");
const heapSort = document.querySelector("#heap-sort");
const quickSort = document.querySelector("#quick-sort");
const speedSlider = document.querySelector(".speed-slider");
//with speed we will just reduce the timeout by that factor
let isRunning = false;
let viewportWidth = 50;
let speed = 1;
// slider.addEventListener("mouseup",(event)=>{ (not working???)
//     console.log(event.currentTarget.value);
// });
const playDelete = () => {
  const aud = new Audio("sounds/delete.wav");
  aud.play();
};
const playClick = () => {
  const aud = new Audio("sounds/click.wav");
  aud.play();
};
slider.addEventListener("input", (event) => {
  clearArray(true);
  viewportWidth = event.currentTarget.value;
  array.style.width = viewportWidth + "vw";
});
speedSlider.addEventListener("change", (event) => {
  speed = event.currentTarget.value;
});

/*difference between input and change
input tracks each dx movement
change tracks only the final place reached by slider
*/
const clearArray = (flag) => {//flag used as sometimes we need sound sometimes not
  //when we are generating another random array then cleaning at that moment we dont need sound
  //coz the sound for new array generation will be made
  const bars = document.querySelectorAll(".bar");
  if (bars.length) {
    bars.forEach((elem) => {
      elem.remove();
    });
    if (flag) playDelete();
  }
};
/*based on width the number of elements change where the width and gap 
between bars remain same*/
const generateArray = () => {
  isRunning = false;
  playClick();
  let w = +viewportWidth; //number was obtained
  let barW = 0.45,
    gap = 0.1;
  let cnt = Math.floor(w / (barW + gap));
  for (let i = 1; i <= cnt; i++) {
    let randHeight = Math.floor(Math.random() * 70) + 1;
    let HTMLelem = `
        <div class="bar" data-height="${randHeight}" style="height:${randHeight}vh;left:${
      (i - 1) * (barW + gap)
    }vw;"></div>
        `;
    array.insertAdjacentHTML("beforeend", HTMLelem);
  }
};
arrayGenerator.addEventListener("click", () => {
  clearArray(false);
  generateArray();
});
const swapBars = async (e1, e2,class1,class2) => {
  //when swapping we need to swap the heights
  const temp1 = e1.style.height,
    temp2 = e1.getAttribute("data-height");
    // console.log(e1.classList);
    // console.log(e2.classList);
    // console.log(temp3);
    // console.log(e2.classList[e2.classList.length-1]);
  e1.style.height = e2.style.height;
  e1.setAttribute("data-height", e2.getAttribute("data-height"));
  e1.classList.toggle(class1);
  e1.classList.toggle(class2);
  e2.style.height = temp1;
  e2.setAttribute("data-height", temp2);
  e2.classList.toggle(class1);
  e2.classList.toggle(class2);

  // console.log(e2.classList[e2.classList.length-1]);
  // console.log(e1.classList);
  // console.log(e2.classList);
};
//synchronous timeout needed here so using this from internet
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const selectionSort = async () => {
  isRunning = true;
  let elemArr = document.querySelectorAll(".bar");
  let n = elemArr.length;
  let min, currH, ind;
  for (let i = 0; i < n; i++) {
    elemArr[i].classList.toggle("selected-bar");
    min = +elemArr[i].getAttribute("data-height"); //height stored to be retrieved later
    ind = i;
    for (let j = i + 1; j < n; j++) {
      elemArr[j].classList.toggle("to-swap");
      currH = +elemArr[j].getAttribute("data-height");
      if (currH < min) {
        min = currH;
        ind = j;
      }
      await timeout(500 / speed);
      // await setTimeout(()=>{
      //   console.log("1");
      // },500/speed);
      elemArr[j].classList.toggle("to-swap");
    }
    elemArr[ind].classList.toggle("to-swap");
    await timeout(1000 / speed);
    swapBars(elemArr[i], elemArr[ind],"selected-bar","to-swap");//i->selected-bar  ind->to-swap
    await timeout(2000 / speed);
    elemArr[ind].classList.toggle("selected-bar");
    elemArr[i].classList.toggle("to-swap");
    elemArr[i].classList.toggle("sorted-bar");
    await timeout(2000/speed);
  }
  isRunning = false;
};
const bubbleSort = async () => {
  isRunning = true;
  let elemArr = document.querySelectorAll(".bar");
  let n = elemArr.length;
  for (
    let i = n;
    i >= 1;
    i-- //size of array to sort reduces
  ) {
    for (let j = 0; j <= i - 2; j++) {
      let flag=false;
      elemArr[j].classList.toggle("selected-bar");
      elemArr[j + 1].classList.toggle("to-swap");
      await timeout(500 / speed);
      let h1 = +elemArr[j].getAttribute("data-height"),
        h2 = +elemArr[j + 1].getAttribute("data-height");
      if (h1 > h2) {
        flag=true;
        await timeout(200/speed)
        swapBars(elemArr[j], elemArr[j + 1],"selected-bar","to-swap");
        await timeout(800/speed);//to show after swapping height increased
        elemArr[j+1].classList.toggle("selected-bar");
        elemArr[j].classList.toggle("to-swap");
      }
      if(!flag)
      {elemArr[j].classList.toggle("selected-bar");
      elemArr[j + 1].classList.toggle("to-swap");
    }
    
    }
    elemArr[i - 1].classList.add("sorted-bar");
  }
  isRunning = false;
};
const removeAllClasses=()=>{//to make blue again
  let elemArr = document.querySelectorAll(".bar");
  elemArr.forEach((elem)=>{
      if(elem.classList.contains("sorted-bar"))
      {
        elem.classList.remove("sorted-bar");
      }
      if(elem.classList.contains("selected-bar"))
      {
        elem.classList.remove("selected-bar");
      }
      if(elem.classList.contains("to-swap"))
      {
        elem.classList.remove("to-swap");
      }
  });
}
const colorlessSwapBars=(e1,e2)=>{//sometimes we need just the height that is colorless
  const temp1 = e1.style.height,
  temp2 = e1.getAttribute("data-height");
e1.style.height = e2.style.height;
e1.setAttribute("data-height", e2.getAttribute("data-height"));
e2.style.height = temp1;
e2.setAttribute("data-height", temp2);
}
const insertionSort=async ()=>{
  isRunning = true;
  let elemArr = document.querySelectorAll(".bar");
  let n = elemArr.length;
  for(let i=1;i<=n;i++)
  {
    elemArr[i-1].classList.toggle("sorted-bar");
    for(let j=i;j>=1;j--)
    {
      elemArr[j].classList.toggle("to-swap");
      let h1=+elemArr[j].getAttribute("data-height"),h2=+elemArr[j-1].getAttribute("data-height");
      await timeout(2000/speed);
      if(h2>h1)
      {
        elemArr[j].classList.toggle("to-swap");
        colorlessSwapBars(elemArr[j],elemArr[j-1]);
      }
      else
      {
        elemArr[j].classList.toggle("to-swap");
        break;
      }
    }
  }
  isRunning=false;
}

let mergeSortCounter=1;
const merge=async (elemArr,lb,mid,ub)=>{
  //inplace merging is needed here
  //inplace merging hence using the gap method of merge sort
  //merge sort is not inplace the merging step the gap method makes it inplace
  toggleColorAll(elemArr,lb,ub,'range');
  await timeout(2000/speed);
  toggleColorAll(elemArr,lb,ub,'range');
  let gap=Math.ceil((ub-lb+1)/2);
  let flag=false;
  while(true)
  {
    let i=lb,j=lb+gap;
    while(j<=ub)
    {
      let h1=+elemArr[i].getAttribute("data-height"),h2=+elemArr[j].getAttribute("data-height");
      // await timeout(5000/speed);
      if(h1>h2)
      {
        await timeout(3000/speed);
        elemArr[i].classList.toggle("to-swap");
        elemArr[j].classList.toggle("to-swap-2");
        swapBars(elemArr[i],elemArr[j],"to-swap","to-swap-2");
        await timeout(3000/speed);
        elemArr[j].classList.toggle("to-swap");
        elemArr[i].classList.toggle("to-swap-2");
      }
      i++;
      j++;
    }
    if(flag)
    break;
    if(gap===1)
    {
      flag=true;
    }
    gap=Math.ceil(gap/2);
  }

}
const toggleColorAll=(elemArr,lb,ub,clas)=>{
  for(let i=lb;i<=ub;i++)
  {
    elemArr[i].classList.toggle(clas);
  }

}
const addColorAll=(elemArr,lb,ub,clas)=>{
  for(let i=lb;i<=ub;i++)
  {
    elemArr[i].classList.add(clas);
  }
}
const mergeSortAlgo=async (elemArr,lb,ub)=>{
 
  if(lb<ub)
  {
    let mid=lb+Math.floor((ub-lb)/2);
    await mergeSortAlgo(elemArr,lb,mid);//wait because it is asynchronous we have to wait for it to be over
    addColorAll(elemArr,lb,mid,'sorted-bar');
    await timeout((mergeSortCounter*3000)/speed);
    await mergeSortAlgo(elemArr,mid+1,ub);
    addColorAll(elemArr,lb,mid,'sorted-bar');
    await timeout((mergeSortCounter*3000)/speed);
    await merge(elemArr,lb,mid,ub);
    addColorAll(elemArr,lb,ub,'sorted-bar');
    await timeout((mergeSortCounter*3000)/speed);
    mergeSortCounter+=0.2;
  }
  else 
  return;
}

const mergeSortHelper=()=>{//helper to call recursive function
  mergeSortCounter=1;
  isRunning = true;
  let elemArr = document.querySelectorAll(".bar");
  let n = elemArr.length;
  mergeSortAlgo(elemArr,0,n-1);
  isRunning = false;
}
const heapify= async (arr,i,n)=>{
  let largest=i,elemH=+arr[i].getAttribute("data-height"),l=(2*i)+1,r=(2*i)+2;
  if(l<n)
  {
    let h1=+arr[l].getAttribute("data-height");
    if(elemH<h1)
    {
      largest=l;
      elemH=h1;
    }
  }
  if(r<n)
  {
    let h2=+arr[r].getAttribute("data-height");
    if(elemH<h2)
    {
      largest=r;
      elemH=h2;
    }
  }
  if(largest!==i)
  {
    arr[largest].classList.toggle("selected-bar");
    arr[i].classList.toggle("to-swap");
    await timeout(1000/speed);
    swapBars(arr[largest],arr[i],"selected-bar","to-swap");
    await timeout(1000/speed);
    arr[i].classList.toggle("selected-bar");
    arr[largest].classList.toggle("to-swap");
    await heapify(arr,largest,n);
  }
}
const heapSortAlgo=async ()=>{
  isRunning=true;
  let elemArr=document.querySelectorAll(".bar"),n;
  n=elemArr.length;
  speed*=4;//heapify of our original heap of not much use so giving it high speed
  for(let i=Math.floor((n/2))-1;i>=0;i--)
  {
     await heapify(elemArr,i,n);
  }
  speed/=4;
  for(let i=n-1;i>=0;i--)
  {
    elemArr[i].classList.toggle("selected-bar");
    elemArr[0].classList.toggle("to-swap");
    await timeout(2500/speed);
    swapBars(elemArr[i],elemArr[0],"selected-bar","to-swap");
    await timeout(2500/speed);
    elemArr[0].classList.toggle("selected-bar");
    elemArr[i].classList.toggle("to-swap");
    elemArr[i].classList.toggle("sorted-bar");
    await timeout(2000/speed);
     await heapify(elemArr,0,i);//then this heapify from 0 is of use hence shown 
  }
  isRunning=false;

}
const quickSortPartition=async(elemArr,lb,ub,n)=>{
  toggleColorAll(elemArr,lb,ub,'range');
  await timeout(3000/speed);
  toggleColorAll(elemArr,lb,ub,'range');
  let mid=lb+Math.floor(((ub-lb)/2));
  //we will find the position of the middle element
  let h=+elemArr[mid].getAttribute("data-height"),cnt=0;
  elemArr[mid].classList.toggle("sorted-pivot-bar");
  await timeout(1500/speed);
  for(let i=lb;i<=ub;i++)
  {
    let h_=+elemArr[i].getAttribute("data-height");
    if(h_<h)
    cnt++;
  }
  colorlessSwapBars(elemArr[mid],elemArr[cnt+lb]);
  elemArr[mid].classList.toggle("sorted-pivot-bar");
  elemArr[cnt+lb].classList.toggle("sorted-pivot-bar");
  await timeout(2000/speed);
  let i=lb,j=cnt+1+lb;
while(i<cnt+lb && j<=ub)
{
  while(i<lb+cnt && (+elemArr[i].getAttribute("data-height"))<h)
  i++;
  while(j<=ub &&(+elemArr[j].getAttribute("data-height"))>=h)
  j++;
  if(i<lb+cnt && j<=ub)
  {
    elemArr[i].classList.toggle("to-swap");
    elemArr[j].classList.toggle("selected-bar");
    await timeout(2000/speed);
    swapBars(elemArr[i],elemArr[j],"selected-bar","to-swap");
    await timeout(2000/speed);
    elemArr[j].classList.toggle("to-swap");
    elemArr[i].classList.toggle("selected-bar");
  }
}
elemArr[cnt+lb].classList.toggle("sorted-pivot-bar");
elemArr[cnt+lb].classList.toggle("sorted-bar");
await timeout(2000/speed);
return cnt+lb;
}
const quickSortAlgo=async (elemArr,lb,ub,n)=>{
  if(+lb<=+ub)
  {
    let pos=await quickSortPartition(elemArr,lb,ub,n);
    await quickSortAlgo(elemArr,lb,pos-1,n);
    await quickSortAlgo(elemArr,pos+1,ub,n);
  }
}
const quickSortAlgoHelper=()=>{//helper to call recursive function
  isRunning = true;
  let elemArr = document.querySelectorAll(".bar");
  let n = elemArr.length;
  quickSortAlgo(elemArr,0,n-1,n);
  isRunning = false;

}
selectSort.addEventListener("click", () => {
  if (!isRunning) {
    removeAllClasses();
    playClick(); //when no algo is running then enable the buttons
    selectionSort();
  }
});
bubSort.addEventListener("click", () => {
  if (!isRunning) {
   removeAllClasses();
    playClick();
    bubbleSort();
  }
});
inserSort.addEventListener("click", () => {
  if (!isRunning) {
   removeAllClasses();
    playClick();
    insertionSort();
  }
});
mergeSort.addEventListener("click",()=>{
  if (!isRunning) {
    removeAllClasses();
     playClick();
     mergeSortHelper();
   }
});
heapSort.addEventListener("click",()=>{
  if (!isRunning) {
    removeAllClasses();
     playClick();
     heapSortAlgo();
   }
});
quickSort.addEventListener("click",()=>{
  if (!isRunning) {
    removeAllClasses();
     playClick();
    quickSortAlgoHelper();
   }
});

/*merge and quick sort

gold color used to mark-
merge->mere sorted array step
quick->finding the mid of the partition selected

green color used to mark-
merge->temporarily sorted 
quick->finally sorted

dark-green in quick sort to mark temporary pivot element
*/

/*Heap sort
initially heapify step not shown as not very visually useful
afterwards then the heapify of root is shown subsequently*/

/*setTimout vs custom timeout function?
setTimout is async hence will not wait
hence I made a custom timeout function that will wait thus making flow synchronous
With this new timeout function we have the way to stop and wait for it as it returns a promise
via await keyword
*/

/*how to manipulate array size?
either to change bar size -> cumbersome
I changed the space for the bars to take while the space of each bar and between was same
*/

/*maniplulating speed
Whereever timeout time is multiplied by 1/speed factor so speed increases pause/timeout
decreases hence the speed increases of the algo*/
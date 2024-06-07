let canvas = document.getElementById('spinnerCanvas')
let spinWheel = canvas.getContext('2d')
let colors = ['#baf4ee', '#4ed4c6', '#069687']
let spinArr = []
let isSpinning = false
let skipArr = []
let resultArr = []

// function createResultLists(){
//   console.log("abc");

//   let colNum = parseInt(document.getElementById("noOfList").value);
//   console.log(colNum,"colnum");
//   let total = resultArr.length;
//   let count = Math.ceil(total / colNum);
//   console.log(count,"count");

// }

// function createColumns (colNum){
//   var group,
//       result = [];
// var colNum = colNum;
// var total = data.length;
//   console.log("total", total);
// var count = Math.ceil(total/colNum);
//   console.log("count",count);
// var column = 0;

// for (var i = 0; i < count.length; i++) {
//       group = [];
//       result.push(group);
//       console.log("result", result);
// }

//   for (var i = 0; i < total; i++) {
//   column++;
//     console.log("column", column);

//     //group.push(data[i]);

//   $("#columns").append('<div id="column' + column + '" class="col-group"></div>');
//   $("#column" + column).html(data.splice(0, count));
//   }
//   $("#column").remove();
// }
// createColumns(3);
// });

function drawWheel() {
  let slices = spinArr.length
  let sliceAngle = (2 * Math.PI) / slices

  spinWheel.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < slices; i++) {
    spinWheel.beginPath()
    spinWheel.moveTo(canvas.width / 2, canvas.height / 2)
    spinWheel.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      sliceAngle * i,
      sliceAngle * (i + 1)
    )
    spinWheel.closePath()
    spinWheel.fillStyle = colors[i % colors.length]
    spinWheel.fill()

    spinWheel.save()
    spinWheel.translate(canvas.width / 2, canvas.height / 2)
    spinWheel.rotate(sliceAngle * (i + 0.5))
    spinWheel.textAlign = 'end'
    spinWheel.fillStyle = '#000000'
    spinWheel.font = 'bold small-caps 20px serif'
    spinWheel.fillText(spinArr[i], canvas.width / 4, 0)
    spinWheel.restore()
  }
}

function addItem() {
  let inputValue = document.getElementById('text').value.trim()

  if (spinArr.includes(inputValue)) {
    alert('Duplicate entry! Please enter a unique value.')
    return
  }

  if (inputValue !== '') {
    let list = document.getElementById('list')
    let item = document.createElement('div')
    let value = document.createElement('div')
    item.className = 'list-item'
    item.textContent = inputValue

    let skipInput = document.createElement('span')
    skipInput.innerHTML = '<i class="fa fa-eye"></i>'
    skipInput.className = 'skip-val mr-2'
    skipInput.onclick = function () {
      toggleSkip(item, inputValue, skipInput)
    }

    let removeInput = document.createElement('span')
    removeInput.innerHTML = '<i class="fa fa-trash-o"></i>'
    removeInput.className = 'spin-close'
    removeInput.onclick = function () {
      list.removeChild(item)
      let index = spinArr.indexOf(inputValue)
      if (index !== -1) {
        spinArr.splice(index, 1)
        localStorage.setItem('spinWheelItems', JSON.stringify(spinArr))
        drawWheel()
      }
    }
    list.appendChild(item)
    item.appendChild(value)
    value.appendChild(skipInput)
    value.appendChild(removeInput)

    spinArr.push(inputValue)
    drawWheel()
    localStorage.setItem('spinWheelItems', JSON.stringify(spinArr))
    document.getElementById('text').value = ''
  } else {
    console.log('input is empty')
  }
}

function displayList() {
  let list = document.getElementById('list')
  list.innerHTML = ''

  spinArr.forEach((spinWheelItem) => {
    let item = document.createElement('div')
    let value = document.createElement('div')
    item.className = 'list-item'
    item.textContent = spinWheelItem

    let skipInput = document.createElement('span')
    skipInput.innerHTML = '<i class="fa fa-eye"></i>'
    skipInput.className = 'skip-val'
    skipInput.onclick = function () {
      toggleSkip(item, spinWheelItem, skipInput)
    }

    let removeInput = document.createElement('span')
    removeInput.innerHTML = '<i class="fa fa-trash-o"></i>'
    removeInput.className = 'spin-close'
    removeInput.onclick = function () {
      let index = spinArr.indexOf(spinWheelItem)
      if (index !== -1) {
        spinArr.splice(index, 1)
        localStorage.setItem('spinWheelItems', JSON.stringify(spinArr))
        drawWheel()
      }
    }
    list.appendChild(item)
    item.appendChild(value)
    value.appendChild(skipInput)
    value.appendChild(removeInput)
  })

  skipArr.forEach((skipItem) => {
    let item = document.createElement('div')
    let value = document.createElement('div')
    item.className = 'list-item'
    item.textContent = skipItem

    let skipInput = document.createElement('span')
    skipInput.innerHTML = '<i class="fa fa-eye-slash"></i>'
    skipInput.className = 'undo-skip'
    skipInput.onclick = function () {
      toggleSkip(item, skipItem, skipInput)
    }

    let removeInput = document.createElement('span')
    removeInput.innerHTML = '<i class="fa fa-trash-o"></i>'
    removeInput.className = 'spin-close'
    removeInput.onclick = function () {
      list.removeChild(div)
      let index = skipArr.indexOf(skipItem)
      if (index !== -1) {
        skipArr.splice(index, 1)
        localStorage.setItem('SkippedArray', JSON.stringify(skipArr))
      }
    }

    list.appendChild(item)
    item.appendChild(value)
    value.appendChild(skipInput)
    value.appendChild(removeInput)
  })
}

function updateSkipList() {
  let skipList = document.getElementById('skip-list')
  skipList.innerHTML = ''
  skipArr.forEach((skipItem) => {
    let item = document.createElement('div')
    item.className = 'list-item'
    item.textContent = skipItem
    skipList.appendChild(item)
  })
}

function updateResultList() {
  let resultList = document.getElementById('result-list')
  resultList.innerHTML = ''
  resultArr.forEach((resultItem) => {
    let item = document.createElement('div')
    item.className = 'list-item'
    item.textContent = resultItem
    resultList.appendChild(item)
  })
}

function toggleSkip(div, items, skipInput) {
  if (skipInput.querySelector('i').classList.contains('fa-eye')) {
    skipArr.push(items)
    let index = spinArr.indexOf(items)
    if (index !== -1) {
      spinArr.splice(index, 1)
    }
    skipInput.querySelector('i').classList.remove('fa-eye')
    skipInput.querySelector('i').classList.add('fa-eye-slash')
  } else {
    spinArr.push(items)
    let index = skipArr.indexOf(items)
    if (index !== -1) {
      skipArr.splice(index, 1)
    }
    skipInput.querySelector('i').classList.remove('fa-eye-slash')
    skipInput.querySelector('i').classList.add('fa-eye')
  }
  displayList()
  localStorage.setItem('spinWheelItems', JSON.stringify(spinArr))
  localStorage.setItem('SkippedArray', JSON.stringify(skipArr))
  drawWheel()
}

let timeSlider = document.getElementById('timeRange')
let duration = document.getElementById('time')
duration.innerHTML = timeSlider.value

timeSlider.oninput = function () {
  duration.innerHTML = this.value
}

let speedSlider = document.getElementById('speedRange')
let speed = document.getElementById('speed')
speed.innerHTML = speedSlider.value

speedSlider.oninput = function () {
  speed.innerHTML = this.value
}

function spin() {
  let spinButton = document.getElementById('spinbtn')
  if (isSpinning) {
    return
  }

  isSpinning = true
  spinButton.disabled = true
  spinButton.style.cursor = 'none'

  let slices = spinArr.length
  let spin = Math.floor(Math.random() * slices + 1) * (360 / slices)

  timeSlider.oninput = function () {
    duration.innerHTML = this.value
  }

  rotateElement(canvas, {
    angle: 0,
    animateTo: 360 + spin,
    duration: timeSlider.value,
    speed: speedSlider.value,
  })

  setTimeout(function () {
    let slices = spinArr.length
    let sliceAngle = 360 / slices
    let currentAngle = ((360 + spin) * speedSlider.value) % 360

    let resultIndex = Math.floor(((360 - currentAngle - 90) % 360) / sliceAngle)
    resultIndex = (slices + resultIndex) % slices

    let resultText = spinArr[resultIndex]
    //         let listCount = parseInt(document.getElementById("noOfList").value);
    //         let arrays = [];
    //         for (let i = 0; i < listCount; i++) {
    //             arrays.push([]);
    //         }

    //         // Distribute the results into the arrays
    //         for (let i = 0; i < resultText.length; i++) {
    //             arrays[i % listCount].push(resultText[i]);
    //         }

    // console.log(arrays, "arrays");

    spinArr = spinArr.filter(function (item) {
      return item !== resultText
    })

    updateModal(resultText)
    console.log(spinArr)

    let resultButton = document.getElementById('resultButton')
    resultButton.click()

    spinButton.disabled = false
    spinButton.style.cursor = 'pointer'
    isSpinning = false
  }, timeSlider.value)

  drawWheel()
}

function updateModal(resultText) {
  let modalBody = document.querySelector('.modal-body p')
  modalBody.innerHTML = resultText
}

function rotateElement(element, options) {
  let currentAngle = 0
  let start = null

  function step(timestamp) {
    if (!start) start = timestamp

    var progress = timestamp - start
    // currentAngle = options.angle + (options.animateTo - options.angle) * Math.min(progress / options.duration, 1);

    let totalRotation =
      options.angle +
      (options.animateTo - options.angle) *
        Math.min(progress / options.duration, 1)
    currentAngle = options.speed * totalRotation
    console.log(spinArr)

    element.style.transform = 'rotate(' + currentAngle + 'deg)'

    if (progress < options.duration) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}
function skipData() {
  let modalBody = document.querySelector('.modal-body p')
  let skipValue = modalBody.textContent
  skipArr.push(skipValue)
  console.log('SkippedArray', skipArr)
  spinArr = spinArr.filter(function (item) {
    return item !== skipValue
  })

  localStorage.setItem('spinWheelItems', JSON.stringify(spinArr))
  localStorage.setItem('SkippedArray', JSON.stringify(skipArr))
  drawWheel()
  displayList()
}
function doneData() {
  let modalBody = document.querySelector('.modal-body p')
  let doneValue = modalBody.textContent
  resultArr.push(doneValue)
  console.log('resultArray', resultArr)
  spinArr = spinArr.filter(function (item) {
    return item !== doneValue
  })

  localStorage.setItem('spinWheelItems', JSON.stringify(spinArr))
  localStorage.setItem('resultArr', JSON.stringify(resultArr))
  drawWheel()
  updateResultList()
}

document
  .getElementById('result-list-tab')
  .addEventListener('click', updateResultList)
document
  .getElementById('skip-list-tab')
  .addEventListener('click', updateSkipList)

function clearList() {
  localStorage.clear()
  window.location.reload()
}

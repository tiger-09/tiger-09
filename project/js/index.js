//搜索框
const ul = document.querySelector('.list')
const inp = document.querySelector('.fir_inp')
inp.addEventListener('input', function () {
    const text = this.value.trim()
    const script = document.createElement('script')
    script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,33222,33306,33259,33235,32973,33351,33313,33312,33311,33310,33309,33308,33307,33145,22159,33389&wd=${ text }&req=2&csor=4&pwd=aiq&cb=bindHtml&_=1608775410035`
    document.body.appendChild(script)
    script.remove()
})
function bindHtml(res) {
    console.log(res)
    if (!res.g) {
      ul.style.display = 'none'
      return
    }
    let str = ''
    res.g.forEach(item => {
      str += `
        <li>${ item.q }</li>
      `
    })
    ul.innerHTML = str
    ul.style.display = 'block'
  }
//轮播图
        const bannerbox = document.querySelector('.banner')
        const imgbox = document.querySelector('.imgbox')
        const JDbox = document.querySelector('.JDbox')
        const button = document.querySelector('.button')
        const left = document.querySelector('.left')
        const right = document.querySelector('.right')
        const imgs = document.querySelectorAll('img')
        const banner_width = bannerbox.clientWidth
        let index = 1
        let flag = true
        //创建焦点
        setJD()
        function setJD(){
            const JDNum = imgbox.children.length
            const frg = document.createDocumentFragment()
            for(let i=0;i<JDNum;i++){
                const li = document.createElement('li')
                if(i===0){
                    li.classList.add('active')
                }
                li.dataset.page = i
                frg.appendChild(li)
            }
            JDbox.appendChild(frg)
            JDbox.style.width = JDNum * (20+10) + 'px'
        }
    //复制元素
    copyEle()
    function copyEle(){
        const first = imgbox.firstElementChild.cloneNode(true)
        const last = imgbox.lastElementChild.cloneNode(true)
        imgbox.appendChild(first)
        imgbox.insertBefore(last,imgbox.firstElementChild)
        imgbox.style.width = imgbox.children.length * 100 + '%'
        imgbox.style.left  = -banner_width +'px'
        // console.log(imgbox.style.left);
    }
    //自动轮播
    auto()
    function auto(){
        timer = setInterval(() => {
            index ++
            move(imgbox,{left:-index * banner_width},moveEnd)
        }, 2000);
    }
    //结束运动
    function moveEnd(){
        if(index===imgbox.children.length-1){
            index = 1
            imgbox.style.left  = -banner_width + 'px'
        }
        if(index===0){
            index = imgbox.children.length-2
            imgbox.style.left = -banner_width * index + 'px'
        }
        for(let i=0; i<JDbox.children.length; i++){
            JDbox.children[i].classList.remove('active')
        }
        JDbox.children[index-1].classList.add('active')
        flag = true
    }
    //移入移出
    outover()
    function outover(){
        bannerbox.addEventListener('mouseover',()=>{
            clearInterval(timer)
        })
        bannerbox.addEventListener('mouseout',()=>{
            auto()
        })
    }
    //左右按钮
    around() 
    function around(){
        right.addEventListener('click',()=>{
            if(flag === false) return
            index ++
            move(imgbox,{left: -index * banner_width},moveEnd)
            flag = false
        })
        left.addEventListener('click',()=>{
            if(flag === false)  return
            index --
            move(imgbox,{left: -index * banner_width},moveEnd)
            flag = false
        })
    }
    //焦点切换
    focal()
    function focal(){
        JDbox.addEventListener('click',e=>{
            e = e || Window.event
            const target = e.target || e.srcElement
            if(target.nodeName ==='LI'){
                if(!flag)return
                flag = false
                const page = target.dataset.page-0
                index = page + 1
                move(imgbox,{left:-index * banner_width},moveEnd)
            }
        })
    }
    //切换页面
    change()
    function change(){
        document.addEventListener('visibilitychange',()=>{
            const tab = document.visibilityState
            if(tab ==='hidden'){
                clearInterval(timer)
            }
            if(tab === 'visible'){
                auto()
            }
        }) 
    }
//move函数
function move(ele, target, fn) {
    let count = 0
    for (let key in target) {
      if (key === 'opacity') target[key] *= 100
      count++
      const timer = setInterval(() => {
        // 1. 获取当前值
        let current
        if (key === 'opacity') current = window.getComputedStyle(ele)[key] * 100
        else current = parseInt(window.getComputedStyle(ele)[key])
  
        // 2. 计算本次运动的距离
        let distance = (target[key] - current) / 10
        distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
  
        // 3. 判断是否到达目标位置
        if (current === target[key]) {
          clearInterval(timer)
          count--
          if (!count) fn()
        } else {
          if (key === 'opacity') ele.style[key] = (current + distance) / 100
          else ele.style[key] = current + distance + 'px'
        }
      }, 20)
    }
  }                                
//选项卡
const for_list = document.querySelector('.for_list')
const tt = for_list.children
const brother = document.querySelectorAll('.q1')

for(let i =0 ; i < tt.length; i++){
    tt[i].addEventListener('click',function(){
        for(let j = 0 ; j < tt.length; j++){
            tt[j].classList.remove('active')
            brother[j].classList.remove('active')
        }
        tt[i].classList.add('active')
        brother[i].classList.add('active')
    })
} 
const lii = document.querySelector('.li1')
lii.onclick = function(){
    window.location.href = './login.html'
}
const divv = document.querySelectorAll('.connet_one_two1>div')
divv.forEach(function(item){
    item.onclick = function(){
        window.location.href = './datail.html'
    }
})
const divvv = document.querySelectorAll('.connet_one_two2>div')
divvv.forEach(function(item){
    item.onclick = function(){
        window.location.href = './datail.html'
    }
})

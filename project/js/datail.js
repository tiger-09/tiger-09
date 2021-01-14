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
  //放大镜
  function Expand(select){
    this.ele = document.querySelector(select)
    this.show = this.ele.querySelector('.show')
    this.mask = this.ele.querySelector('.mask')
    this.list = this.ele.querySelector('.list')
    this.warp = this.ele.querySelector('.warp')
    this.showWidth = this.show.clientWidth
    this.showHeight =this.show.clientHeight
    this.imgWidth = parseInt(window.getComputedStyle(this.warp).backgroundSize.split(' ')[0])
    this.imgHeight = parseInt(window.getComputedStyle(this.warp).backgroundSize.split(' ')[1])
    this.warpWidth =parseInt(window.getComputedStyle(this.warp).width)
    console.log(this.warpWidth);
    this.warpHeight =parseInt(window.getComputedStyle(this.warp).height)
    this.init()
}
    Expand.prototype.init = function(){
        this.setsize()
        this.setmove()
        this.overout()
        this.switch()
    }
 //移入移出
Expand.prototype.overout = function(){
    this.show.addEventListener('mouseover',()=>{
        this.mask.style.display ='block'
        this.warp.style.display ='block'
    })
    this.show.addEventListener('mouseout',()=>{
        this.mask.style.display ='none'
        this.warp.style.display ='none'
    })
}
//计算尺寸
Expand.prototype.setsize =function(){
    this.maskWidth =this.showWidth * this.warpWidth / this.imgWidth
    this.maskHeight =this.showHeight * this.warpHeight / this.imgHeight
    this.mask.style.width = this.maskWidth + 'px'
    this.mask.style.height = this.maskHeight + 'px'
}
//移动
Expand.prototype.setmove = function(){
    this.show.addEventListener('mousemove', (e) => {
       e = e || window.event
       let moveX = e.offsetX - this.maskWidth / 2
       let moveY = e.offsetY - this.maskHeight / 2
       if(moveX <= 0) moveX = 0
       if(moveY <= 0) moveY = 0
       if(moveX >= this.showWidth - this.maskWidth) moveX = this.showWidth - this.maskWidth
       if(moveY >= this.showHeight - this.maskHeight)moveY = this.showHeight - this.maskHeight 
       this.mask.style.left = moveX + 'px'
       this.mask.style.top  = moveY + 'px'
       const imgX = moveX * this.warpWidth / this.maskWidth
       const imgY = moveY * this.warpHeight / this.maskHeight
       console.log(imgX);
       console.log(imgY);
       this.warp.style.backgroundPosition= `-${imgX}px -${imgY}px`
    })
}
//列表切换
Expand.prototype.switch = function(){
    this.list.addEventListener('click',(e)=>{
        console.log(this.list.firstElementChild)
        e = e || window.event
        const target = e.target || e.srcElement
        if(target.nodeName === 'IMG'){
            const showUrl = target.dataset.show
            const warpUrl = target.dataset.warp
            this.show.firstElementChild.src = showUrl
            this.warp.style.backgroundImage =  `url(${warpUrl})`
            for(let i=0; i< this.list.children.length; i++){
                this.list.children[i].classList.remove('active')
            }
            target.classList.add('active')
        } 
    })
}
const E1 = new Expand('.box')
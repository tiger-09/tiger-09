$(function(){
    $('.submit').click(async()=>{
        // console.log('1')
        const username = $('.text').val()
        const password = $('.password').val()
        console.log(username)
        console.log(password)
        if(!username || !password) return alert('请完整填写表单')

        if(!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('表单不符合规则')
        
        const {code, nickname} = await $.post('../php/login.php/',{username , password},null,'json')

        if(!code) return alert('错误')

        window.location.href = './index.html'
    })
    $('.zhuce').click(function(){
        console.log('1')
        $('.reg').css('display','block')
        $('.login').css('display','none')
    })
    $('.denglu').click(function(){
        $('.reg').css('display','none')
        $('.login').css('display','block')
    })

    $('.submit2').click(async()=>{
        const username = $('.text2').val()
        const password = $('.password2').val()
        const nickname = $('.password3').val()
        console.log(username)
        console.log(password)
        console.log(nickname)
        if(!username || !password ||!nickname) return alert('注册不能为空')
        if(!/^[a-z0-9]\w{4,11}$/i.test(username) || !/^\w{6,12}$/i.test(password)) return alert('用户名字母数字开头5-12位，密码6-12位，昵称随便')
        const {code} =  await $.post('../php/login2.php',{username , password, nickname},null,'json')
        if(!code){
            alert('注册失败')
        }else{
            alert('注册成功')
            $('.login').css({'display':'block'})
            $('.reg').css({'display':'none'})
        }
    })
})




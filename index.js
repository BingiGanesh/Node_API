import express from "express";


const app = express();


app.use(express.json())



app.post('/login',Validate,(req,res)=>{
    res.json({
        'message':'Login Succesfully'
    })
})



app.listen(4000,(e)=>{
    console.log('server runing')
})


function Validate(req,res,nxt){
    if(!req.body){
        return json({
            'message':'Provide Username And Password to Login !'
        })
    }
    else{
        const {username,password} = req.body;
        
        const userpattern = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$')

        const passpattern = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[@#$%^&+=]).*$')

        // validate username
        if(!username){
            return res.json({
                'message':'Provide Username to Login !'
            })
        }
        else{
            if(username.length < 6 ){
                return res.json({
                    'message':"Username must be atleast 6 characters !"
                })
            }
            else if(username.length > 12 ){
                return res.json({
                    'message':"Username must be maximum 12 characters only !"
                })
            }
            else if(!userpattern.test(username)){
                return res.json({
                    'message':"Username must contain only Alphanumeric !"
                })
            }
        }
        // validate password
        if(!password){
            return res.json({
                'message':'Provide Password to Login !'
            })
        }
        else{
            if(password.length < 6 ){
                return res.json({
                    'message':"Password must be atleast 6 characters !"
                })
            }
            else if(!passpattern.test(password)){
                return res.json({
                    'message':"Password must contain Alphanumeric and Special characters !"
                })
            }
        }
    }
    
    nxt()
}
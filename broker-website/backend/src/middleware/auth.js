const Authenticate=(req,res, next)=>{
    const {firstName, lastName, email, password, fan}=req.body;

    function validEmail(userEmail){
        return /^\w+([\.~]?\w+)*@\w+([\.~]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if(req.path==="/register"){

        if(![firstName,lastName,email, password, fan].every(Boolean)){
            return res.status(400).json("missing credentials");
        }else if(!validEmail(email)){
            return res.status(400).json("Invalid Email");
        }
    }
    
    else if(req.path === "/signin"){
        if(![email,password].every(Boolean)){
            return res.status(400).json("missing credentials");
        }else if(!validEmail(email)){
            return res.status(400).json("Invalid Email");
        }
    }
    next()
};
export default Authenticate
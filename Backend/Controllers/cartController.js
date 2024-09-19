const userModel =require("../Models/UserModel");


// add to user cart  
const addToCart = async (req, res) => {
  try {
     let userData = await userModel.findOne({_id:req.body.userId});
     let cartData = await userData.cartData;
     if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
     }
     else {
        cartData[req.body.itemId] += 1;
     }
     await userModel.findByIdAndUpdate(req.body.userId, {cartData});
     res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
     console.log(error);
     res.json({ success: false, message: "Error" })
  }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
  try {
     let userData = await userModel.findById(req.body.userId);
     let cartData = await userData.cartData;
     if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
     }
     await userModel.findByIdAndUpdate(req.body.userId, {cartData});
     res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
     console.log(error);
     res.json({ success: false, message: "Error" })
  }

}

// get user cart
// const getCart = async (req, res) => {
//    try {
//       let userData = await userModel.findById(req.body.userId);
//       let cartData = await userData.cartData;
//       res.json({ success: true, cartData:cartData });
//    } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: "Error" })
//    }
// }


// const getCart = async(req,res)=>{
//    try {
//      let userData = await userModel.findById(req.body.userId);
//      let cartData = await userData.cartData;
//      res.json({success:true,cartData})
//    } catch (error) {
//      console.log(error);
//      res.json({success:false,message:"Error"})
//    }
// }





const getCart = async (req, res) => {
  try {
      const userId = req.user.id; 
      const userCart = await userModel.findOne({ userId });  

      if (!userCart || !userCart.cartData) {
          return res.status(404).json({ message: 'Cart not found or cart data is empty' });
      }

      res.status(200).json(userCart.cartData);
  } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports= { addToCart, removeFromCart, getCart }

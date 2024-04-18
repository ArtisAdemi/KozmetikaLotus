import {Box, Button, Divider, IconButton, Typography} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import styled from "@emotion/styled"
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from "../state"
import { useNavigate } from "react-router-dom"

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center
`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item?.count * item?.price;
    }, 0)

  return (
    <Box //overlay
    display={isCartOpen ? "block" : "none"}
    backgroundColor={"rgba(0, 0, 0, 0.4)"}
    position={"fixed"}
    zIndex={10}
    width="100%"
    height="100%"
    right="0"
    top="0"
    overflow={"auto"}
    > 
    {/*     MODAL       */}
        <Box 
        className= "bg-white fixed r-0 b-0 w-[max(400px, 30%) h-[100%]"
        >
            <Box
            padding={"30px"}
            overflow={"auto"}
            height={"100%"}
            >
                {/* HEADER */}
                <FlexBox>
                   <Typography variant="h3">SHOPPING CART ({cart.length})</Typography>
                   <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                        <CloseIcon />
                   </IconButton>
                 </FlexBox>

                 {/*  CART LIST */}
                 <Box>
                    {cart.map((item) => (
                        <Box key={`${item?.title}-${item?.id}`}>
                            <FlexBox p={"15px 0"}>
                                <Box flex={"1 1 40%"}>
                                    <img 
                                    alt={item?.title}
                                    width={"123px"}
                                    height={"164px"}
                                    src={item?.imgUrl}
                                    />
                                </Box>
                                <Box flex={"1 1 60%"}>
                                    {/* ITEM NAME */}
                                    <FlexBox mb={"5px"}>
                                        <Typography fontWeight={"bold"}>
                                            {item?.title}
                                        </Typography>
                                        <Typography>
                                            {item?.shortDescription}
                                        </Typography>
                                        {/* AMOUNT */}
                                        <FlexBox m="15px 0">
                                            <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            border={"1.5px solid #A3A7FC"}
                                            >
                                                <IconButton onClick={() => dispatch(decreaseCount({id: item.id}))}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography>{item?.count}</Typography>
                                                <IconButton onClick={() => dispatch(increaseCount({id: item.id}))}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        {/* PRICE */}
                                        <Typography fontWeight={"bold"}>{item?.price}€</Typography>
                                        </FlexBox>
                                        <IconButton onClick={() => dispatch(removeFromCart({id: item.id}))}>
                                            <CloseIcon />
                                        </IconButton>
                                    </FlexBox>
                                </Box>
                            </FlexBox>
                            <Divider />
                        </Box>
                    ))}
                 </Box>
                 {/* ACTIONS */}
                 <Box m="20px 0">
                    <FlexBox m="20px 0">
                        <Typography fontWeight={"bold"}>SUBTOTAL</Typography>
                        <Typography fontWeight={"bold"}>{totalPrice}€</Typography>
                    </FlexBox>
                    <Button
                    sx={{
                        backgroundColor: "#A3A7FC",
                        color: "white",
                        borderRadius: 0,
                        minWidth: "100%",
                        padding: "20px 40px",
                        m: "20px 0"
                    }}
                    onClick={() => {
                        navigate("/checkout");
                        dispatch(setIsCartOpen({}));
                    }}
                    >Porosit</Button>
                 </Box>
            </Box>
        </Box>

    </Box>
  )
}

export default CartMenu
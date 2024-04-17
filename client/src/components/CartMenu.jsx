import {Box, Button, Divider, IconButton, Typography} from "@mui/material"
import { UseSelector, useDispatch, useSelector } from "react-redux"
import CloseIcon from "@mui/icons-material/Close"
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
        return total + item.count * item.attributes.price;
    }, 0)

  return (
    <Box //overlay
    display={isCartOpen ? "block" : "none"}
    backgroundColor={"rgba(0, 0, 0, 0.4)"}
    position={"fixed"}
    zIndex={10}
    width={"100%"}
    height={"100%"}
    left={"0"}
    top={"0"}
    overflow={"auto"}
    > 
    {/*     MODAL       */}
        <Box 
        position={"fixed"}
        right={"0"}
        bottom={"0"}
        width={"max(400px, 30%"}
        height={"100%"}
        backgroundColor="white"
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
                        <Box key={`${item.attributes.name}-${item.id}`}>
                            <FlexBox p={"15px 0"}>
                                <Box flex={"1 1 40%"}>
                                    <img 
                                    alt={item.name}
                                    width={"123px"}
                                    height={"164px"}
                                    src={item.img}
                                    />
                                </Box>
                                <Box flex={"1 1 60%"}>
                                    <FlexBox mb={"5px"}>
                                        <Typography fontWeight={"bold"}>
                                            {item.name}
                                        </Typography>
                                        <IconButton onClick={() => dispatch(removeFromCart({id: item.id}))}>
                                            <CloseIcon />
                                        </IconButton>
                                    </FlexBox>
                                </Box>
                            </FlexBox>
                        </Box>
                    ))}
                 </Box>
            </Box>
        </Box>

    </Box>
  )
}

export default CartMenu
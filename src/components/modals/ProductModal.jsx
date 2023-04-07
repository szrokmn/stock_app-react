import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "../../styles/globalStyle";
import { Button, TextField } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";

export default function ProductModal({ open, handleClose, info, setInfo }) {

  const { postStockData } = useStockCall();
  const { putStockData } = useStockCall();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  console.log(info);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (info.id) {
        putStockData("products", info);        
    }else {
        postStockData("products", info);
    }
    handleClose();
    setInfo({ name: "", phone: "", address: "", image: "" });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
          setInfo({name:"", phone:"", address:"", image:""})
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={handleSubmit}
            component="form"
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              required
              variant="outlined"
              value={info?.name}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              required
              variant="outlined"
              value={info?.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              required
              variant="outlined"
              value={info?.address}
              onChange={handleChange}
            />
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              required
              variant="outlined"
              value={info?.image}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Submit Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

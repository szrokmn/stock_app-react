import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useDispatch } from "react-redux"
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"

const Firms = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const getFirms = async () => {
    const BASE_URL = "https://12126.fullstack.clarusway.com/"
    dispatch(fetchStart())
    const url = "firms"
    try {
      const { data } = await axios(`${BASE_URL}stock/firms/`, {
        headers: { Authorization: `Token ${token}` },
      })
      dispatch(getSuccess({ data, url }))
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
    }
  } 

  useEffect(() => {
    getFirms()
   
  }, [])

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firm
      </Typography>

      <Button
        variant="contained"        
      >
        New Firm
      </Button>

     
    </div>
  )
}

export default Firms
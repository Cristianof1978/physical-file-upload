import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'

import styles from './styles'

import axios from '../../services/api'

function generatePreviewImgUrl(file, cb) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => cb(reader.result)
}

class UploadBox extends Component {
    
    state = {
        image: 'Image name',
        previewImgUrl: '',
        file: '',
    }

    handleChange = (event) => {
        const file = event.target.files[0]

        if (!file) {
            return
        }
        this.setState({
            image: file.name
        })

        generatePreviewImgUrl(file, previewImgUrl => {
            this.setState({ previewImgUrl })
        })
    }

    handleSubmit = (event) => {
        const file = this.state.file

        const formData = new FormData()

        formData.append('image', file)
        formData.append('name', 'Cristiano Flores')

        axios.post('/', upload.single('file'), (req, res) => {
            res.redirect('/');
        });
    }

    render() {
        const style = this.props.classes
        return (
            <Paper className={style.paper} elevation={5}>
                <Typography gutterBottom={true} variant="h2" component="h3" align='center'>
                    Mongo upload file
                </Typography>
                <hr className={style.hr}></hr>
                <FormControl fullWidth onSubmit={this.handleSubmit}>
                    <div className={style.div}>
                        <input
                            accept="image/*"
                            className={style.input}
                            id="contained-button-file"
                            type="file"
                            onChange={this.handleChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                        <TextField
                            id="outlined-bare"
                            className={style.textField}
                            variant="outlined"
                            margin='none'
                            disabled
                            fullWidth
                            value={this.state.image}
                        />
                    </div>
                    <div className={style.imgBox}>
                        <img className={style.img} src={this.state.previewImgUrl} alt='' />
                    </div>
                    <Button variant="contained" color="primary" className={style.buttonSend}>
                        Send
                        <Icon className={style.rightIcon}>send</Icon>
                    </Button>
                </FormControl>
            </Paper>
        )
    }
}

export default withStyles(styles)(UploadBox);
import S3 from "react-aws-s3";
import React, {useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const Form = () => {
    const [images, setImages] = useState([]);

    const onFormSubmit = () => {
        console.log("i am submitting ")
        console.log(images)
        const config = {
                                bucketName: "test-v-scoop",
                                dirName: `vscoop/posts/images`,
                                region: "us-west-1",
                                accessKeyId: "AKIAQCFG5Q36QAG6N4EQ",
                                secretAccessKey:
                                    "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",
        };

        
                            // const config = {
                            //     bucketName: "palace-test",
                            //     dirName: `test/test1`,
                            //     region: "us-west-1",
                            //     accessKeyId: "AKIASKDYLURXY3SZAXNL",
                            //     secretAccessKey:
                            //         "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",
                            // };


        const ReactS3Client = new S3(config);
        // for (var i = 0; i < images.length; i ++) {
        //     handleUpload(images[i], ReactS3Client)
        // }
        if(images.length > 0) {
            ReactS3Client.uploadFile(images[0], images[0].name).then((data) => {
                console.log(data)
                if (data.status === 204) {
                    console.log("succcess")
                } else {
                    console.log("failed to upload")
                }
            });
        }
        
    }

    // const handleUpload = (image, client) => {
    //     client.uploadFile(image, image.name).then((data) => {
    //         console.log(data)
    //         if (data.status === 204) {
    //             console.log("succcess")
    //         } else {
    //             console.log("failed to upload")
    //         }
    //     });
    // }
    

    const fileHandler = (event) => {
        console.log("meoowwwwwwwwwwwwww");
        let fileObj = [];
        let fileArray = [];

        if (event.target.files) {
            fileObj.push(event.target.files);
            for (let i = 0; i < fileObj[0].length; i++) {
                fileArray.push(URL.createObjectURL(fileObj[0][i]));
            }
            console.log(images);
            setImages(event.target.files);
        }
    }

    return (
        <div>
            
                        <Card>
                            <CardContent>
                                <h1>Media</h1>
                                <div>
                                    <label htmlFor="upload">
                                        <div>
                                            <div>
                                                upload image(s)
                                            </div>
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        multiple={true}
                                        id="upload"
                                        onChange={fileHandler}
                                    />
                                    <div>
                                        {`${images.length} image(s) ready to be uploaded`}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div>
                            <button onClick = {onFormSubmit()}>
                                Upload to S3
                            </button>
                        </div>
        </div>
    )
}

export default Form;


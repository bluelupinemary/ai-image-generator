import React, {useRef, useState} from 'react'
import "./ImageGenerator.css"
import hero_image from "../Assets/images/hero-image.jpg"

const ImageGenerator = () => {
    const [imageURL, setImageURL] = useState("/");
    const [loading, setLoading] = useState(false)
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        try {
            if (inputRef.current.value === "") return;

            setLoading(true);

            // Fetch data from API
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512"
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const generatedImageURL = data?.data[0]?.url;
            setImageURL(generatedImageURL);
        } catch (error) {
            console.error("Error:", error.message);
            // Handle error appropriately, e.g., show a user-friendly message
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI Image <span>Generator</span></div>
            <div className='img-loading'>
                <div className='image'>
                    {loading ? (
                        <p>Generating Image...</p>
                    ) : (
                        <img src={imageURL === "/" ? hero_image : imageURL} alt="hero" width={512} height={512} />
                    )}
                </div>
            </div>
            <div className='search-box'>
                <input type="text" ref={inputRef} className="search-input" placeholder="Describe your image here"/>
                <span className='generate-btn' onClick={()=>imageGenerator()}>Generate</span>
            </div>
        </div>
    );
};

export default ImageGenerator;
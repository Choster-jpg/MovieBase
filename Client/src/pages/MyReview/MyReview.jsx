import React, {useState} from 'react';
import classes from './MyReview.module.scss';
import {Editor} from "@tinymce/tinymce-react";
import {AutoStories, Movie, Photo} from "@mui/icons-material";
import {Slider} from "@mui/material";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import Button from "../../components/UI/Button/Button.jsx";

const MyReview = () => {
    const [value, setValue] = useState('');

    const [storyInputValue, setStoryInputValue] = useState('');
    const [visualInputValue, setVisualInputValue] = useState('');

    const [overallValue, setOverallValue] = useState('');
    const [percentage, setPercentage] = useState(50);

    const [percentageStory, setPercentageStory] = useState(50);
    const [percentageVisual, setPercentageVisual] = useState(50);

    const validateValue = (value) => {
        if(value === "") return true;
        if(!/^\d+$/.test(value)) return false;

        let number = Number(value);
        return (number > 0 && number < 11);
    }

    const handleSliderChange = (event, newValue) => {
        setPercentage(newValue);
        setPercentageStory(newValue);
        setPercentageVisual(100 - Number(newValue));
        const number = Number(percentageStory) / 100 * Number(storyInputValue) + Number(percentageVisual) / 100 * Number(visualInputValue);
        console.log(Number(percentageStory) / 100 * Number(storyInputValue));
        setOverallValue(Math.round(number * 10) / 10);
    }

    const handleStoryInputChange = (event) => {
        if(validateValue(event.target.value))
        {
            setStoryInputValue(event.target.value);
        }
    }

    const handleVisualInputChange = (event) => {
        if(validateValue(event.target.value))
        {
            setVisualInputValue(event.target.value);
        }
    }

    return (
        <div className={classes.background}>
            <h2>Your review</h2>
            <h3>The Dark Knight</h3>
            <span>2008</span>
            <div className={classes.displayedRatesContainer}>
                <div className={classes.rateItem}>
                    <AutoStories/>
                    <span>Story</span>
                    <span>{storyInputValue} / 10</span>
                </div>
                <div className={`${classes.rateItem} ${classes.highlight}`}>
                    <Movie/>
                    <span>Overall</span>
                    <span>{overallValue} / 10</span>
                </div>
                <div className={classes.rateItem}>
                    <Photo/>
                    <span>Visual</span>
                    <span>{visualInputValue} / 10</span>
                </div>
            </div>
            <div className={classes.tipContainer}>
                <span>Using the slider below, please, chose the <mark>weight</mark> of each mark in overall value</span>
            </div>
            <div className={classes.ratesContainer}>
                <div className={classes.inputItem}>
                    <FilledInput placeholder="" value={storyInputValue} onChange={handleStoryInputChange}/>
                </div>
                <div className={classes.sliderContainer}>
                    <div>
                        <span>{percentageStory}%</span>
                        <span>{percentageVisual}%</span>
                    </div>
                    <Slider aria-label="Default" valueLabelDisplay="off"
                            step={5} min={5} max={95} value={percentage} onChange={handleSliderChange}
                            className={classes.slider} />
                </div>
                <div className={classes.inputItem}>
                    <FilledInput placeholder="" value={visualInputValue} onChange={handleVisualInputChange}/>
                </div>
            </div>
            <div className={classes.textEditorContainer}>
                <Editor apiKey="xb4ufeqri5yg2v4f272jhgalx2t372j8q1aduvya0ua7aphl"
                        onEditorChange={(newValue) => {
                            setValue(newValue);
                        }} init={{
                            selector: 'textarea',
                            toolbar: 'blur',
                            setup: function (editor) {
                                editor.ui.registry.addButton('blur', {
                                    icon: 'blur',
                                    tooltip: 'Blur selected text',
                                    onAction: function () {
                                        const selection = editor.selection.getContent();

                                        // Wrap selected text with a span element with a CSS blur filter applied
                                        const blurredText = '<span style="filter: blur(3px);">' + selection + '</span>';
    
                                        // Replace the selected text in the editor with the blurred text
                                        editor.selection.setContent(blurredText);
                                    }
                                });
                            }
                }}/>
            </div>
            <div className={classes.buttonContainer}>
                <Button variant="contained">
                    Done
                </Button>
            </div>
        </div>
    );
};

export default MyReview;
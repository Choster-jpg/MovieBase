import React, {useEffect, useState} from 'react';
import classes from './MyReview.module.scss';
import {Editor} from "@tinymce/tinymce-react";
import {AutoStories, ExpandMore, Movie, Photo} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Divider, Slider} from "@mui/material";
import FilledInput from "../../components/UI/FilledInput/FilledInput.jsx";
import Button from "../../components/UI/Button/Button.jsx";
import RateSlider from "../../components/UI/RateSlider/RateSlider.jsx";
import TextRating from "../../components/UI/TextRating/TextRating.jsx";
import DOMPurify from 'dompurify';

import { createReview } from '../../dataService/reviewDataService.js';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const MyReview = () => {
    const user = useSelector(state => state.userData);

    const maxTitleLength = 40;

    const location = useLocation();
    const navigate = useNavigate();

    const [titleValue, setTitleValue] = useState('');
    const [editorValue, setEditorValue] = useState('');

    const { movie } = location.state;

    const [overall_rate, setOverall_rate] = useState(0);

    const [story_rate, setStory_rate] = useState(1);
    const [visual_rate, setVisual_rate] = useState(1);
    const [acting_rate, setActing_rate] = useState(1);
    const [originality_rate, setOriginality_rate] = useState(1);
    const [emotional_impact_rate, setEmotional_impact_rate] = useState(1);
    const [meaning_depth_rate, setMeaning_depth_rate] = useState(1);

    useEffect(() => {
        const number = (story_rate + visual_rate + acting_rate + originality_rate + emotional_impact_rate + meaning_depth_rate) / 60 * 10;
        setOverall_rate(number.toFixed(1));
    });

    useEffect(() => {
        console.log(location);
    }, [])

    const accordionStyle = {
        "& .MuiAccordionSummary-root": {
            backgroundColor: "#435055",
        },
        "& .MuiAccordionDetails-root": {
            backgroundColor: "#435055",
            "> span": {
                color: "#e3dfdc",
                fontSize: "0.8em",
                display: "block",
                lineHeight: "1.2em"
            }
        },
    };

    const setTitleInputValue = (e) => {
        if(e.target.value.length <= maxTitleLength) {
            setTitleValue(e.target.value);
        }
    }

    const submit = async () => {
        const purifiedValue = DOMPurify.sanitize(editorValue);
        const result = await createReview({
            story_rate,
            visual_rate,
            acting_rate,
            originality_rate,
            emotional_impact_rate,
            meaning_depth_rate,
            overall_rate,
            title: titleValue,
            html_content: purifiedValue,
            movie_id: movie.id || null,
            movie,
            user_id: 1,
        })
        console.log("Review was sent successfully!", result);
        if(result) navigate(`/movies/${movie.imdb_link}`, { state: { movie: {...movie, year: movie.year, title: movie.title} }})
    }

    return (
        <div className={classes.background}>
            <h2>Your review</h2>
            <h3>{movie.title}</h3>
            <span>{movie.year}</span>

            <div className={classes.accordionsContainer}>
                <Accordion sx={accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h4>Story:</h4>
                        <TextRating rate={`${story_rate}.0`} isDotNeeded={false} className={classes.rating}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span>The plot or narrative of the movie. It includes elements such as the setting,
                        characters, conflict, and resolution. A good story is engaging, well-developed,
                        and keeps the audience interested throughout the movie.</span>
                        <RateSlider value={story_rate} setValue={setStory_rate}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h4>Visual:</h4>
                        <TextRating rate={`${visual_rate}.0`} isDotNeeded={false} className={classes.rating}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span>The visual aspects of the movie, such as cinematography, special effects,
                            lighting, and art direction. Visuals can play a major role in creating
                            atmosphere, mood, and tone in a movie. A movie with strong visuals is
                            visually stunning and enhances the overall viewing experience.</span>
                        <RateSlider value={visual_rate} setValue={setVisual_rate}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h4>Acting:</h4>
                        <TextRating rate={`${acting_rate}.0`} isDotNeeded={false} className={classes.rating}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span>the quality of the performances by the actors in the movie.
                            Good acting involves conveying emotions and delivering dialogue convincingly,
                            making the characters feel real and relatable. Strong acting can help to
                            bring characters to life and make them feel believable.</span>
                        <RateSlider value={acting_rate} setValue={setActing_rate}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h4>Originality:</h4>
                        <TextRating rate={`${originality_rate}.0`} isDotNeeded={false} className={classes.rating}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span>The degree to which a movie offers a unique or innovative perspective, story,
                            or approach. An original movie can stand out from others in its genre
                            and leave a lasting impression on audiences.</span>
                        <RateSlider value={originality_rate} setValue={setOriginality_rate}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h4>Emotional impact:</h4>
                        <TextRating rate={`${emotional_impact_rate}.0`} isDotNeeded={false} className={classes.rating}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span>The emotional response that the movie evokes from the audience. A movie with
                            a strong emotional impact can make the audience feel deeply connected
                            to the story and characters.</span>
                        <RateSlider value={emotional_impact_rate} setValue={setEmotional_impact_rate}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={accordionStyle}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <h4>Meaning depth:</h4>
                        <TextRating rate={`${meaning_depth_rate}.0`} isDotNeeded={false} className={classes.rating}/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span>The deeper messages or themes that a movie explores, such as love, loss,
                            redemption, or social commentary. A movie with meaningful depth can offer
                            insight into human nature and provide food for thought long after the
                            movie has ended.</span>
                        <RateSlider value={meaning_depth_rate} setValue={setMeaning_depth_rate}/>
                    </AccordionDetails>
                </Accordion>

                <div className={classes.summary}>
                    <h4><mark>Overall:</mark></h4>
                    <TextRating rate={`${overall_rate}`} isDotNeeded={false} className={classes.rating}/>
                </div>
            </div>

            <div className={classes.titleInput}>
                <h3>Title:</h3>
                <FilledInput placeholder="Type title here..." value={titleValue} onChange={setTitleInputValue}/>
            </div>

            <div className={classes.textEditorContainer}>
                <h3>Review content:</h3>
                <Editor apiKey="xb4ufeqri5yg2v4f272jhgalx2t372j8q1aduvya0ua7aphl"
                        onEditorChange={(newValue) => {
                            setEditorValue(newValue);
                        }}/>
            </div>
            <div className={classes.buttonContainer}>
                <Button variant="contained" onClick={submit}>
                    Done
                </Button>
            </div>
        </div>
    );
};

export default MyReview;
"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Depending on Job Position, Job Description & Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview Question along with Answer in JSON format. Give Question and Answers as Field in Json. ";

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = await result.response.text();

      // Clean up any non-JSON characters, including Markdown or extraneous characters
      MockJsonResp = MockJsonResp.replace(/```json/g, "") // Remove '```json' if present
        .replace(/```/g, "") // Remove closing code block marker if present
        .trim(); // Trim whitespace from the start and end

      // Parse the cleaned JSON
      const parsedResponse = JSON.parse(MockJsonResp);
      console.log(parsedResponse);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    } finally {
      setLoading(false);
    }
    // const result = await chatSession.sendMessage(InputPrompt);
    // const MockJsonResp = result.response
    //   .text()
    //   .replace("```json", "")
    //   .replace("```", "");
    // console.log(JSON.parse(MockJsonResp));
    // setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer 
      transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your Job role/position, Job description
                    and Years of Experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc."
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        'Generating from AI'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

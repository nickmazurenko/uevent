import { WithContext as ReactTags } from "react-tag-input";
import { ChangeEventHandler, useState } from "react";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export type Tag = {
  id: string;
  text: string;
};

export type Props = {
  tags: Tag[];
  setTags: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const TagInput = (props: Props) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { tags: eventTags, setTags: setEventTags } = props;

  const handleDelete = (i: number) => {
    const newTags = tags.filter((tag: Tag, index: number) => index !== i);
    setTags(newTags);
    setEventTags({
      target: { id: "tags", value: newTags.map((tag: Tag) => tag.text) },
    });
  };

  const handleAddition = (tag: Tag) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    setEventTags({
      target: { id: "tags", value: newTags.map((tag: Tag) => tag.text) },
    });
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    const event = {
      target: { id: "tags", value: newTags.map((tag: Tag) => tag.text) },
    };
    setTags(newTags);
    setEventTags(event);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };
  return (
    <ReactTags
      tags={tags}
      // TODO: create a fetch request to get event tag examples
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="bottom"
      autocomplete
    />
  );
};

export default TagInput;

const suggestions = [
  {"id": "concert", "text": "Concert"},
  {"id": "festival", "text": "Festival"},
  {"id": "conference", "text": "Conference"},
  {"id": "workshop", "text": "Workshop"},
  {"id": "seminar", "text": "Seminar"},
  {"id": "exhibition", "text": "Exhibition"},
  {"id": "networking", "text": "Networking"},
  {"id": "party", "text": "Party"},
  {"id": "gala", "text": "Gala"},
  {"id": "awards", "text": "Awards"},
  {"id": "launch", "text": "Launch"},
  {"id": "opening", "text": "Opening"},
  {"id": "closing", "text": "Closing"},
  {"id": "fundraiser", "text": "Fundraiser"},
  {"id": "panel", "text": "Panel"},
  {"id": "roundtable", "text": "Roundtable"},
  {"id": "retreat", "text": "Retreat"},
  {"id": "bootcamp", "text": "Bootcamp"},
  {"id": "hackathon", "text": "Hackathon"},
  {"id": "meetup", "text": "Meetup"},
  {"id": "training", "text": "Training"},
  {"id": "webinar", "text": "Webinar"},
  {"id": "symposium", "text": "Symposium"},
  {"id": "congress", "text": "Congress"},
  {"id": "forum", "text": "Forum"},
  {"id": "lecture", "text": "Lecture"},
  {"id": "competition", "text": "Competition"},
  {"id": "showcase", "text": "Showcase"},
  {"id": "recital", "text": "Recital"},
  {"id": "performance", "text": "Performance"}
];

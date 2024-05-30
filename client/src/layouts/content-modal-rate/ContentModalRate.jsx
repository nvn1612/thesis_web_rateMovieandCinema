import React from "react";
import { ImageContent } from "../../components/image-content/ImageContent";
import { StarRate } from "../../components/star-rate/StarRate";
import { InputRate } from "../../components/input-rate/InputRate";
export const ContentModalRate = ({label_1,label_2,label_3,label_4,label_5,label_6,textContent}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <StarRate label={label_1}/>
        <StarRate label={label_2}/>
        <StarRate label={label_3}/>
        <StarRate label={label_4}/>
        <StarRate label={label_5}/>
        <StarRate label={label_6}/>
      </div>
      <div>
          <InputRate label="Viết nhận xét" textContent={textContent}/>
      </div>
    </div>
  );
};

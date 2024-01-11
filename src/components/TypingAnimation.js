import TypeIt from "typeit-react";

const TypingAnimation = () => {
  return (
    <span className="type-it">
      <TypeIt
        options={{
          speed: 200,
          loop: true,
          strings: ["Your Style, Your Voice", "Moments of Boldness and Beauty", "The Art of Self-Expression", "Transformations and Revelations"
        ],
          breakLines: false,
        }}
      />
    </span>
  );
};
export default TypingAnimation;

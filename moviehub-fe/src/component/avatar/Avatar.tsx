import IAvatar from "./IAvatar";

const Avatar = ({ image, size }: IAvatar) => {
  return (
    <>
      <div className="avatar">
        <div
          className={`${size ? `w-${size} h-${size}` : 'w-12 h-12'} rounded-full border border-transparent`}
        >
          <img src={image} alt="Avatar" className="w-full h-full rounded-full" />
        </div>
      </div>
    </>
  );
};

export default Avatar;
const PasswordValidation = ({
  passwordStrength,
  passwordChecks,
}: {
  passwordStrength: number;
  passwordChecks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}) => {
  return (
    <div>
      <div className="h-1 w-full bg-gray-200 rounded-full mt-2">
        <div
          className="h-full bg-black rounded-full transition-all duration-300"
          style={{ width: `${(passwordStrength / 5) * 100}%` }}
        ></div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground grid grid-cols-2 gap-1">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={passwordChecks.length}
            readOnly
            className="mr-1 h-3 w-3 accent-black"
          />
          8+ characters
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={passwordChecks.uppercase}
            readOnly
            className="mr-1 h-3 w-3 accent-black"
          />
          Uppercase
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={passwordChecks.lowercase}
            readOnly
            className="mr-1 h-3 w-3 accent-black"
          />
          Lowercase
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={passwordChecks.number}
            readOnly
            className="mr-1 h-3 w-3 accent-black"
          />
          Number
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={passwordChecks.special}
            readOnly
            className="mr-1 h-3 w-3 accent-black"
          />
          Special Character
        </div>
      </div>
    </div>
  );
};

export default PasswordValidation;

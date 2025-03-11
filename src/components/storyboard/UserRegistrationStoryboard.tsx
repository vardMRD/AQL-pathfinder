import UserRegistration from "../UserRegistration";

export default function UserRegistrationStoryboard() {
  return (
    <div className="p-6 bg-background">
      <UserRegistration
        onComplete={(userData) => console.log("User registered:", userData)}
      />
    </div>
  );
}

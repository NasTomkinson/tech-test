interface WelcomeCardProps {
    fullName: string;
}

export const WelcomeCard = ({ fullName }: WelcomeCardProps) => {
    return (
        <div className="bg-primary/10 p-4 rounded-lg">
            <p> Hello, {fullName}! </p>
        </div>
    )
}
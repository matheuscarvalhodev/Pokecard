import { colors } from "../utils/colors"

interface ProgressBar {
    label: string,
    value: number,
    max: number,
    tipo:string
}

const ProgressBar: React.FC<ProgressBar> = ({ label, value, max, tipo }) => {
    const progress = (value / max) * 100;

    return (
        <div className="progress-bar">
            <div className="progress-bar__label">{label}</div>
            <div className="progress-bar__container">
                <div
                    className="progress-bar__fill"
                    style={{ width: `${progress}%`, background:`${colors[tipo as keyof typeof colors]}` }}
                ></div>
            </div>
            <div className="progress-bar__value">{value}</div>
        </div>
    );
};

export default ProgressBar;
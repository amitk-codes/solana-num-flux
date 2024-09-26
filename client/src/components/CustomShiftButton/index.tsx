import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

export default function CustomShiftButton({ type }: { type: 'increment' | 'decrement' }) {
  return (
    <button className={`${type === 'increment' ? 'increment-btn' : 'decrement-btn'}`}>
      <span className="back" />
      <span className="front">{type === 'increment' ? <IoMdAdd /> : <FiMinus />}</span>
    </button>
  )
}
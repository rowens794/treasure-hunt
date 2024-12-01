import React from "react";
import { Leader } from "@/interfaces/Hunt";

type Props = {
  leaderboard: Leader[];
};

export default function Leaderboard({ leaderboard }: Props) {
  return (
    <div className="p-8">
      <span className="text-3xl girassol-regular">Leaderboard</span>
      <table className="w-full mt-8 font-serif text-xl text-stone-700">
        <thead>
          <tr className="text-lg border-b border-stone-700">
            <th className="text-left"></th>
            <th className="text-left"></th>

            <th className="text-center">On Clue</th>

            <th className="text-center">Last Solve</th>
          </tr>
        </thead>
        <tbody className="mt-8">
          {leaderboard.map((leader) => (
            <tr key={leader.rank}>
              <td className="pr-8 font-bold text-right">{leader.rank}</td>
              <td>{leader.name}</td>
              <td className="text-center">{leader.currentClue}</td>
              <td className="text-center">{leader.lastSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import Context from '@/models/Context';
import { Player } from '@/models/GamePlay';

export async function LeaderboardHandler(ctx: Context) {

    const distinctLB = await Player.aggregate(
        [{
            $sort: { userId: 1, createdAt: -1 },
        },
        {
            $group: {
                _id: "$userId",
                last6Scores: { $push: "$score" },
                last6Rewards: { $push: "$rewards" }
            }
        }
        ]
    ).exec();


    const lb = distinctLB.map(item => {
        var userId = item._id;
        var scores = item.last6Scores.slice(0, 6);
        let total = 0;
        var ret = 0;
        let score = scores.map((i: number) => total = total + Number(i));
        let rewards = item.last6Rewards.map((i: number) => ret = ret + Number(i));
        let totalScore = Number(score[score.length - 1]).toFixed(2);
        let totalRewards = Number(rewards[rewards.length - 1]).toFixed(2);
        return { userId, totalScore, totalRewards }
    });
    lb.sort(function (a, b) { return parseFloat(b.totalScore) - parseFloat(a.totalScore) });



    ctx.reply(getScores(lb), {
        parse_mode: "HTML", disable_web_page_preview: true
    });



}



function getScores(k: any) {
    var cnt = 1;
    var out = `<b>⭐ LEADERBOARD ⭐</b>
`;
    if (k)
        k.forEach((element: any) => {
            if (cnt < 10) {
                out += `<b>✨ .${cnt++}. <a href="https://t.me/${element.userId}">${element.userId}</a></b> : ${element.totalScore} Points
`;

            }

        });

    return out
}

import Context from '@/models/Context';
import { Player } from '@/models/GamePlay';

export async function TopScoresHandler(ctx: Context) {

    try {
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


        var out = `<b>@${lb[0].userId}</b> was fastest with scoreof <b>#${lb[0].totalScore}</b> Points 
    and <b>@${lb[lb.length - 1].userId}</b> was slowest with a score of <b>#${lb[lb.length - 1].totalScore}</b> Points`;



        ctx.api.sendMessage('-1002061654195', out, {
            parse_mode: "HTML", disable_web_page_preview: true
        })


    } catch (error) {
        console.log("Scores Error " + error)
    }



}


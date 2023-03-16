import { PipelineStage } from 'mongoose';

export function paginationPipeLine(
  countPages?: number,
  limitPages?: number,
  offsetPages?: number,
): PipelineStage[] {
  const page = countPages ?? 1;
  const limit = limitPages ?? 10;
  const offset = offsetPages ?? (page - 1) * limit;

  return [
    {
      $facet: {
        total: [
          {
            $count: 'count',
          },
        ],
        data: [
          {
            $addFields: {
              _id: '$_id',
            },
          },
        ],
      },
    },
    {
      $unwind: '$total',
    },
    {
      $project: {
        items: {
          $slice: [
            '$data',
            offset,
            {
              $ifNull: [limit, '$total.count'],
            },
          ],
        },
        page: {
          $literal: offset / limit + 1,
        },
        hasNextPage: {
          $lt: [{ $multiply: [limit, page] }, '$total.count'],
        },
        totalPages: {
          $ceil: {
            $divide: ['$total.count', limit],
          },
        },
        totalItems: '$total.count',
      },
    },
  ];
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(query) {
        this.whereClause = {};
        this.orderClause = {};
        this.query = query;
    }
    filter(customFilter) {
        const filters = Object.assign({}, this.query);
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((field) => delete filters[field]);
        if (customFilter) {
            this.whereClause = Object.assign(Object.assign({}, this.whereClause), customFilter);
        }
        this.whereClause = Object.assign(Object.assign({}, this.whereClause), filters);
        return this;
    }
    search(searchableFields) {
        const searchTerm = this.query.banks;
        if (searchTerm) {
            this.whereClause = Object.assign(Object.assign({}, this.whereClause), { OR: searchableFields.map((field) => ({
                    [field]: { contains: searchTerm, mode: 'insensitive' },
                })) });
        }
        return this;
    }
    sort(defaultSort = 'createdAt') {
        const sortQuery = this.query.sort || defaultSort;
        const [field, order] = sortQuery.startsWith('-')
            ? [sortQuery.substring(1), 'desc']
            : [sortQuery, 'asc'];
        this.orderClause = { [field]: order };
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        this.skipValue = (page - 1) * limit;
        this.takeValue = limit;
        return this;
    }
    fields() {
        var _a;
        const fields = (_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',');
        if (fields && fields.length > 0) {
            this.selectClause = fields.reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {});
        }
        return this;
    }
    build() {
        const queryObject = {
            where: this.whereClause,
            orderBy: this.orderClause,
            skip: this.skipValue,
            take: this.takeValue,
            select: this.selectClause,
        };
        return queryObject;
    }
}
exports.default = QueryBuilder;

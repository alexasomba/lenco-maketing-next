// @ts-nocheck
import * as __fd_glob_23 from "../content/blog/zm/top-small-business-tips-zambia.mdx?collection=blog"
import * as __fd_glob_22 from "../content/blog/zm/getting-started-with-lenco-zambia.mdx?collection=blog"
import * as __fd_glob_21 from "../content/blog/ng/top-small-business-tips-nigeria.mdx?collection=blog"
import * as __fd_glob_20 from "../content/blog/ng/getting-started-with-lenco-ng.mdx?collection=blog"
import * as __fd_glob_19 from "../content/blog/tax-planning-nigerian-smes.mdx?collection=blog"
import * as __fd_glob_18 from "../content/blog/scaling-your-business-guide.mdx?collection=blog"
import * as __fd_glob_17 from "../content/blog/payment-reconciliation-best-practices.mdx?collection=blog"
import * as __fd_glob_16 from "../content/blog/mobile-banking-security-guide.mdx?collection=blog"
import * as __fd_glob_15 from "../content/blog/getting-started-with-lenco.mdx?collection=blog"
import * as __fd_glob_14 from "../content/blog/fintech-africa-opportunities.mdx?collection=blog"
import * as __fd_glob_13 from "../content/blog/digital-payments-revolution.mdx?collection=blog"
import * as __fd_glob_12 from "../content/blog/cash-flow-management-tips.mdx?collection=blog"
import * as __fd_glob_11 from "../content/blog/business-invoicing-guide.mdx?collection=blog"
import * as __fd_glob_10 from "../content/blog/business-budgeting-guide.mdx?collection=blog"
import * as __fd_glob_9 from "../content/blog/business-account-types-nigeria.mdx?collection=blog"
import * as __fd_glob_8 from "../content/blog/building-finance-team.mdx?collection=blog"
import * as __fd_glob_7 from "../content/blog/building-business-credit.mdx?collection=blog"
import { default as __fd_glob_6 } from "../content/blog/zm/meta.json?collection=blog"
import { default as __fd_glob_5 } from "../content/blog/ng/meta.json?collection=blog"
import { default as __fd_glob_4 } from "../content/blog/meta.json?collection=blog"
import * as __fd_glob_3 from "../content/docs/webhooks.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/authentication.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/api.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blog = await create.docs("blog", "content/blog", {"meta.json": __fd_glob_4, "ng/meta.json": __fd_glob_5, "zm/meta.json": __fd_glob_6, }, {"building-business-credit.mdx": __fd_glob_7, "building-finance-team.mdx": __fd_glob_8, "business-account-types-nigeria.mdx": __fd_glob_9, "business-budgeting-guide.mdx": __fd_glob_10, "business-invoicing-guide.mdx": __fd_glob_11, "cash-flow-management-tips.mdx": __fd_glob_12, "digital-payments-revolution.mdx": __fd_glob_13, "fintech-africa-opportunities.mdx": __fd_glob_14, "getting-started-with-lenco.mdx": __fd_glob_15, "mobile-banking-security-guide.mdx": __fd_glob_16, "payment-reconciliation-best-practices.mdx": __fd_glob_17, "scaling-your-business-guide.mdx": __fd_glob_18, "tax-planning-nigerian-smes.mdx": __fd_glob_19, "ng/getting-started-with-lenco-ng.mdx": __fd_glob_20, "ng/top-small-business-tips-nigeria.mdx": __fd_glob_21, "zm/getting-started-with-lenco-zambia.mdx": __fd_glob_22, "zm/top-small-business-tips-zambia.mdx": __fd_glob_23, });

export const docs = await create.docs("docs", "content/docs", {}, {"api.mdx": __fd_glob_0, "authentication.mdx": __fd_glob_1, "index.mdx": __fd_glob_2, "webhooks.mdx": __fd_glob_3, });
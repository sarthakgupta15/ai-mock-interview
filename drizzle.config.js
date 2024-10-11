/** @type { import {"drizzle-kit"}.Config} */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://ai-mock-interview_owner:74tmfloKxZir@ep-shiny-lab-a1fhdjrg.ap-southeast-1.aws.neon.tech/ai-mock-interview?sslmode=require',
    }
};
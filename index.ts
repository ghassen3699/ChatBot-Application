import concurently from "concurrently";

concurently(
    [
        {
            name: "server",
            command: "bun run dev",
            cwd: "packages/server",
            prefixColor: "blue",
        },
        {
            name: "client",
            command: "bun run dev",
            cwd: "packages/client",
            prefixColor: "green",
        },
    ]
)
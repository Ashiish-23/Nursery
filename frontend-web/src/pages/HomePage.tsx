import { Button } from "../shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";
import { Input } from "../shared/ui/input";

export function HomePage() {
  return (
    <div className="flex h-full items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>SasyaVana</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}
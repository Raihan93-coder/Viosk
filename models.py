from pydantic import BaseModel
class languages:
    language:str
    id: int

    def __init__(self,id,language):
        self.id=id
        self.language=language
